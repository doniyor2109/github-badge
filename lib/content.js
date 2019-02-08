import { badgeUrlFromPattern  } from 'shields.io/core/badge-urls/make-badge-url';
import 'webext-dynamic-content-scripts';
import yaml from 'js-yaml';
import xml from 'xml2js';

import { getStore } from './store'
import { defaultValues, flattenedServices } from './data'
import { baseUrl } from './constants'
import { ADD_BADGE, REMOVE_BADGE, PAGE_CHANGED, repoInfoMessage, GET_REPO_INFO } from './message'
import { sendExtensionMessage } from './helpers';

const parsers = (function() {
  async function yamlParser(res) {
    const text = await res.text();
    return yaml.safeLoad(text);
  }
  async function xmlParser(res) {
    const text = await res.text();
    return new Promise((resolve, reject) => {
      xml.parseString(text, function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  return {
    json: (res) => res.json(),
    yaml: yamlParser,
    yml: yamlParser,
    xml: xmlParser,
  }
})();

async function fetchFile(path) {
  const {user, repo} = getRepoInfo();
  const branch = getCurrentBranchName();
  const ext = path.split('.').pop();
  if (!parsers[ext]) {
    throw new TypeError(`.${ext} file is not supported`);
  }
  try {
    const response = await fetch(`https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`);
    return await parsers[ext](response);
  } catch (e) {
    return null;
  }
}

async function getPackageJson() {
  return await fetchFile('package.json');
}

function getCurrentBranchName() {
  const path = window.location.pathname;
  const matches = path.match(/tree\/([^?\/]+)/);
  return matches && matches[1] || 'master';
}

async function getTravisInfo() {
  return await fetchFile('.travis.yml');
}

async function getPomFile() {
  return await fetchFile('pom.xml');
}

async function getCircleciFile() {
  return await fetchFile('.circleci/config.yml');
}

function getRepoInfo() {
  const [, user, repo] = window.location.pathname.split('/');
  return { user, repo };
}
async function getInfo() {
  const { user: githubUser, repo: githubRepo } = getRepoInfo();
  const npmPkg = await getPackageJson();
  const travis = await getTravisInfo();
  const pom = await getPomFile();
  const circleCi = await getCircleciFile();
  const githubBranch = getCurrentBranchName();
  const npmPackageName = npmPkg.name;
  const artifactId = pom && pom.project.artifactId.join('');
  const groupId = pom && pom.project.groupId.join('');
  return {
    'NodeVersion_packageName': npmPackageName,
    'NpmCollaborators_packageName': npmPackageName,
    'NpmDownloads_packageName': npmPackageName,
    'Jitpack_artifactId': artifactId,
    'Jitpack_groupId': groupId,
    'MavenCentral_groupId': groupId,
    'MavenCentral_artifactId': artifactId,
    'Coveralls_vcsType': 'github',
    'Codecov_vcsName': 'github',
    'CircleCi_vcsType': 'github',
    'CircleCi_owner': githubUser,
    'CircleCi_repo': githubRepo,
    'CircleCi_branch': githubBranch,
  };
}

function createBadgeElement(url) {
  const anchor = document.createElement('a');
  const img = document.createElement('img');

  // data-canonical-src
  img.dataset.canonicalSrc = url;
  img.src = url;
  img.style.maxWidth = '100%';
  img.style.marginLeft = '5px';

  anchor.href = '/';
  anchor.append(img);

  return anchor;
}

function getContainer() {
  const existing =
    // shields.io pattern
    document.querySelector(`.markdown-body.entry-content [data-canonical-src^="https://img.shields.io/badge/"]`) ||

    // assume if there is badge word it is badge element
    document.querySelector(`.markdown-body.entry-content [data-canonical-src*="badge.svg"]`) ||

    // at least assume that there is svg badge element
    document.querySelector(`.markdown-body.entry-content [data-canonical-src*=".svg"]`);

  if (existing) {
    return existing.parentNode.parentNode;
  }

  const header = document.querySelector('.markdown-body.entry-content h1');

  if (header) {
    const newContainer = document.createElement('p');

    header.append(newContainer);

    return newContainer;
  }

  return document.querySelector('.markdown-body.entry-content');
}

async function init() {
  const badgeElements = {};
  const repoInfo = await getInfo();

  function insertBadgeElement(badge) {
    const { id, example: { pattern } } = badge
    let url;
    try {
      url = badgeUrlFromPattern({
        baseUrl,
        pattern,
        namedParams: repoInfo,
      });
    } catch (e) {
      url = badgeUrlFromPattern({
        baseUrl,
        pattern,
        namedParams: defaultValues,
      });
    }
    const element = badgeElements[id] = createBadgeElement(url);

    getContainer().append(element);
  }

  function removeBadgeElement(id) {
    if (badgeElements[id]) {
      badgeElements[id].remove();
      delete badgeElements[id];
    }
  }

  function insertBadges(badges) {
    flattenedServices.forEach((badge) => {
      if (badges.includes(badge.id) && !badgeElements[badge.id]) {
        insertBadgeElement(badge);
      }
    });
  }

  function rehydrate() {
    for (const key in badgeElements) {
      getContainer().append(
        badgeElements[key]
      );
    }
  }

  function messageHandler(message) {
    switch (message.type) {
      case ADD_BADGE:
        insertBadges([message.id]);
        break;
      case REMOVE_BADGE:
        removeBadgeElement(message.id);
        break;
      case PAGE_CHANGED:
        rehydrate();
        break;
      case GET_REPO_INFO:
        sendExtensionMessage(repoInfoMessage(repoInfo));
        break;
    }
  }

  fetchBadges(insertBadges);
  onMessage(messageHandler);
}

function onMessage(callback) {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      callback(request, sender, sendResponse);
    });
}

function fetchBadges(callback) {
  getStore('activeBadges', [], (badges) => {
    callback(badges);
  });
}

init();

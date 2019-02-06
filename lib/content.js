import { staticBadgeUrl, badgeUrlFromPath, badgeUrlFromPattern  } from 'shields.io/core/badge-urls/make-badge-url';
import 'webext-dynamic-content-scripts';

import { getStore } from './store';
import { flattenedServices } from './data';
import { baseUrl } from './constants'
import { ADD_BADGE, REMOVE_BADGE, PAGE_CHANGED } from './message'

async function getPackageJson(userName, repoName) {
  try {
    const response = await fetch(`https://raw.githubusercontent.com/${userName}/${repoName}/master/package.json`);
    return await response.json();
  } catch (e) {
    return null;
  }
}

async function getRepoInfo() {
  const [, user, repo] = window.location.pathname.split('/');
  const pkg = await getPackageJson(user, repo);

  return {
    packageName: pkg && pkg.name,
    repo,
    user,
    addonId: 'addonId',
    branch: 'master',
    path: 'path', // e.g. build/phaser-craft.min.js
    tag: 'tag', // github tag
    number: 100, // e.g. issue count
    key: 'key', // some arbitrary text e.g permissions
    formula: 'formula', // some arbitrary text e.g cake
    query: 'query', // some arbitrary text e.g goto

    // iTunes App Store
    bundleId: 'bundleId', // bundleId text e.g 803453959


    // Jenkins
    scheme: 'http',
    host: 'host',
    job: 'job',
    plugin: 'plugin',
    version: 'version',
    pluginId: 'pluginId',

    // JiraIssue
    issueKey: 'issueKey',
    hostAndPath: 'hostAndPath',
    protocol: 'protocol',
    sprintId: 'sprintId',

    // Jitpack
    artifactId: 'artifactId',
    groupId: 'groupId',

    // LeanpubBookSummaryService
    book: 'book',

    // LgtmGrade
    language: 'language',

    // LiberapayGives
    entity: 'entity',

    // LibrariesIoDependentRepos
    platform: 'platform',
    library: 'library',

    // Luarocks
    moduleName: 'moduleName',

    // Maintenance
    year: 'year',
    maintained: 'maintained',

    // Matrix
    roomAlias: 'roomAlias',

    // MavenCentral
    versionPrefix: 'versionPrefix',

    // MyGetVersionService
    feed: 'feed',
    tenant: 'tenant',

    //
    serverId: 'serverId',
    vcsType: 'vcsType',
    projectId: 'projectId',
    roleId: 'roleId',
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
  const repoInfo = await getRepoInfo();

  function insertBadgeElement(badge) {
    const { id, example: { pattern } } = badge
    const url = badgeUrlFromPattern({
      baseUrl,
      path: pattern,
      pattern,
      namedParams: repoInfo,
      queryParams: repoInfo,
    });
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

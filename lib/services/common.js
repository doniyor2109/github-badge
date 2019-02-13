const servicesJson = require('../services_list');
const { buildUrl } = require('../utils');

function findService(name) {
  return servicesJson.find(item => item.name === name);
}

function execThunk(thunk) {
  return typeof thunk === 'function' ? thunk() : thunk;
}

function silent(fn, fallback) {
  try {
    return execThunk(fn);
  } catch (e) {
    return execThunk(fallback);
  }
}

class Base {
  static supporterImgParams = [];

  constructor(data) {
    this.data = data || {};
  }

  get imgNamedParams() {
    return {};
  }

  get imgQueryParams() {
    return {};
  }

  get linkUrl() {
    return '';
  }

  buildImgUrl() {
    const { img } = findService(this.constructor.name);
    const imgNamedParams = silent(() => this.imgNamedParams, {})
    return buildUrl(
      img.pattern,
      imgNamedParams,
      this.imgQueryParams
    );
  }

  buildLinkUrl() {
    return silent(() => this.linkUrl, '');
  }
}

class GithubCommonValues extends Base {
  static supporterImgParams = ['user', 'repo', 'branch', 'vcsType'];

  get imgNamedParams() {
    const { github } = this.data;
    return {
      user: github.user,
      repo: github.repo,
      branch: github.branch,
      vcsType: 'github',
    };
  }
}

class NpmCommonValues extends Base {
  static supporterImgParams = ['packageName'];

  get imgNamedParams() {
    const { npm }  = this.data;
    return {
      packageName: npm && npm.name,
    };
  }

  get imgQueryParams() {
    return { logo: 'npm' };
  }

  get linkUrl() {
    const { npm }  = this.data;

    return `https://www.npmjs.com/package/${npm.name}`;
  }
}

class MavenCommonValues extends Base {
  static supporterImgParams = ['artifactId', 'groupId'];

  get imgNamedParams() {
    const { maven } = this.data;
    return {
      artifactId: maven.project.artifactId.join(''),
      groupId: maven.project.groupId.join(''),
    };
  }
}

module.exports = {
  GithubCommonValues,
  NpmCommonValues,
  MavenCommonValues,
  Base,
};

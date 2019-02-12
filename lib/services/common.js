const servicesJson = require('../services_list');
const { buildUrl } = require('../utils');

function findService(name) {
  return servicesJson.find(item => item.name === name);
}

class Base {
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
    const imgNamedParams = (() => {
      try {
        return this.imgNamedParams;
      } catch (e) {
        console.error(e);
        return {};
      }
    })();
    return buildUrl(
      img.pattern,
      imgNamedParams,
      this.imgQueryParams
    );
  }

  buildLinkUrl() {
    return this.linkUrl;
  }
}

class GithubCommonValues extends Base {
  static getParams({ github }) {
    return {
      user: github.user,
      repo: github.repo,
      branch: github.branch,
      vcsType: 'github',
    };
  }
}

class NpmCommonValues extends Base {
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
  get imgNamedParams() {
    const { maven } = this.data;
    return {
      artifactId: maven && maven.project.artifactId.join(''),
      groupId: maven && maven.project.groupId.join(''),
    };
  }
}

module.exports = {
  GithubCommonValues,
  NpmCommonValues,
  MavenCommonValues,
  Base,
};

const { GithubCommonValues } = require('./common');

class Depfu extends GithubCommonValues {
  get imgNamedParams() {
    const { github } = this.data;
    return {
      user: github.user,
      repo: github.repo,
    };
  }
}

module.exports = { Depfu };

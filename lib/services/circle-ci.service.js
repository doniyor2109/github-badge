const { Base } = require('./common');

class CircleCi extends Base {
  static supporterImgParams = ['branch', 'repo', 'owner', 'vcsType'];

  get imgNamedParams() {
    const { github } = this.data;
    return {
      branch: github.branch,
      repo: github.repo,
      owner: github.user,
      vcsType: 'github',
    };
  }
  get imgQueryParams() {
    return { logo: 'circleci' };
  }
}

module.exports = { CircleCi };

const { Base } = require('./common');

class CodecovService extends  Base {
  static supporterImgParams = ['branch', 'repo', 'user', 'vcsName'];

  get imgNamedParams() {
    const { github } = this.data;
    return {
      vcsName: 'github',
      user: github.user,
      repo: github.repo,
      branch: github.branch,
    };
  }
  get imgQueryParams() {
    return { logo: 'codecov' };
  }
}

module.exports = { CodecovService };

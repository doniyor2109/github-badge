const { Base } = require('./common');

class Codetally extends Base {
  static supporterImgParams = ['repo', 'owner'];

  get imgNamedParams() {
    const { github } = this.data;
    return {
      owner: github.user,
      repo: github.repo,
    };
  }
}

module.exports = { Codetally };

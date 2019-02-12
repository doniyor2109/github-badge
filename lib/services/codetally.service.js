const { Base } = require('./common');

class Codetally extends Base {
  get imgNamedParams() {
    const { github } = this.data;
    return {
      owner: github.user,
      repo: github.repo,
    };
  }
}

module.exports = { Codetally };

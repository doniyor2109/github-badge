const { Base } = require('./common');

class David extends Base {
  get imgNamedParams() {
    const { github } = this.data;
    return {
      user: github.user,
      repo: github.repo,
    };
  }
}

module.exports = { David };

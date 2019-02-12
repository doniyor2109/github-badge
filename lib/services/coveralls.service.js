const { Base } = require('./common');

class Coveralls extends Base {
  get imgNamedParams() {
    const { github } = this.data;
    return {
      vcsType: 'github',
      user: github.user,
      repo: github.repo,
    };
  }
}

module.exports = { Coveralls };

const { Base } = require('./common');

class Sourcegraph extends Base {
  static supporterImgParams = ['repo'];

  get imgNamedParams() {
    const { github } = this.data;
    return {
      repo: `github.com/${github.user}/${github.repo}`
    };
  }
}

module.exports = { Sourcegraph };


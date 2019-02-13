const { Base } = require('./common');

class Scrutinizer extends Base {
  static supporterImgParams = ['vcsType', 'user', 'repo', 'user'];

  get imgNamedParams() {
    const { github } = this.data;
    return {
      ...github,
      vcsType: 'g',
    };
  }
}

class ScrutinizerCoverage extends Scrutinizer {}

class ScrutinizerBuild extends Scrutinizer {}

module.exports = {
  Scrutinizer,
  ScrutinizerCoverage,
  ScrutinizerBuild,
};

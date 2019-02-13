const { Base } = require('./common');

class Bundlephobia extends Base {
  supporterImgParams = ['packageName'];

  static getParams() {
    const{ npm } = this.data;
    return {
      packageName: npm && npm.name,
    };
  }
}

module.exports = { Bundlephobia };

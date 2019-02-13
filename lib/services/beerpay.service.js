const { Base } = require('./common');

class Beerpay extends Base {
  supporterImgParams = ['user', 'project'];

  get imgNamedParams() {
    const { github } = this.data;
    return {
      user: github.user,
      project: github.branch,
    };
  }
}

module.exports = { Beerpay };

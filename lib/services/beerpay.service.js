const { Base } = require('./common');

class Beerpay extends Base {
  get imgNamedParams() {
    const { github } = this.data;
    return {
      user: github.user,
      project: github.branch,
    };
  }
}

module.exports = { Beerpay };

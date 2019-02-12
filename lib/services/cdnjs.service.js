const { Base } = require('./common');

class Cdnjs extends Base {
  get imgNamedParams() {
    const { npm } = this.data;
    return {
      library: npm.name,
    };
  }
}

module.exports = { Cdnjs };

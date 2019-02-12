const { NpmCommonValues } = require('./common');

class NodeVersion extends NpmCommonValues{
  get imgQueryParams() {
    return { logo: 'node.js' };
  }
}

module.exports = { NodeVersion };

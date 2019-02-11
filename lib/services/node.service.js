class NodeVersion {
  static getParams({ npm }) {
    return {
      packageName: npm.packageName,
    };
  }
}

module.exports = { NodeVersion };

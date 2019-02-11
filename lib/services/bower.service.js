class BowerLicense {
  static getParams({ bower }) {
    return {
      packageName: bower && bower.name,
    };
  }
}

class BowerVersion {
  static getParams({ bower }) {
    return {
      packageName: bower && bower.name,
    };
  }
}

module.exports = {
  BowerLicense,
  BowerVersion,
};

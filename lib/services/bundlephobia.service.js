class BundlephobiaService {
  static getParams({ npm }) {
    return {
      packageName: npm.name,
    };
  }
}

module.exports = { BundlephobiaService };

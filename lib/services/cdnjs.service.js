class CdnjsService {
  static getParams({ npm }) {
    return {
      library: npm.name,
    };
  }
}

module.exports = { CdnjsService };

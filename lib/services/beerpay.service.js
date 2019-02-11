class Beerpay {
  static getParams({ github }) {
    return {
      user: github.user,
      project: github.branch,
    };
  }
}

module.exports = { Beerpay };

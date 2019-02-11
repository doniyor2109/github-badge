class David {
  static getParams({ github }) {
    return {
      user: github.user,
      repo: github.repo,
    };
  }
}

module.exports = { David };

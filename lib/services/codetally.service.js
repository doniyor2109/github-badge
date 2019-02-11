class Codetally {
  static getParams({ github }) {
    return {
      owner: github.user,
      repo: github.repo,
    };
  }
}

module.exports = { Codetally };

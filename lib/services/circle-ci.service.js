class CircleCi {
  static getParams({ npm, github }) {
    return {
      branch: github.branch,
      repo: github.repo,
      owner: github.user,
      vcsType: 'github',
    };
  }
}

module.exports = { CircleCi };

class GithubCommitActivity {
  static getParams({ github }) {
    return {
      user: github.user,
      repo: github.repo,
    };
  }
}

class GithubCommitsSince {
  static getParams({ github }) {
    return {
      user: github.user,
      repo: github.repo,
      version: github.version,
    };
  }
}

module.exports = { GithubCommitActivity };

class CodecovService {
  static getParams({ github }) {
    return {
      vcsName: 'github',
      user: github.user,
      repo: github.repo,
      branch: github.branch,
    };
  }
}

module.exports = { CodecovService };

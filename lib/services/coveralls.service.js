class CoverallsService {
  static getParams({ github }) {
    return {
      vcsType: 'github',
      user: github.user,
      repo: github.repo,
    };
  }
}

module.exports = { CoverallsService };

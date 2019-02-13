const { GithubCommonValues } = require('./common');

class Github extends GithubCommonValues {
  get imgQueryParams() {
    return { logo: 'github' };
  }
}

class GithubCommitActivity extends Github {}

class GithubCommitsSince extends Github {}

class GithubCodeSize extends Github {}

class GithubIssues extends Github {}

class GithubFollowers extends Github {}

class GithubDownloads extends Github {}

class GithubForks extends Github {}

class GithubLanguages extends Github {}

class GithubLastCommit extends Github {}

class GithubLicense extends Github {}

class GithubManifestVersion extends Github {}

class GithubPackageJsonVersion extends Github {}

class GithubContributors extends Github {
  static supporterImgParams = ['contributors', 'user', 'repo'];

  get imgNamedParams() {
    const { github } = this.data;
    return {
      which: 'contributors',
      user: github.user,
      repo: github.repo,
    };
  }
}

module.exports = {
  GithubCommitActivity,
  GithubCodeSize,
  GithubIssues,
  GithubFollowers,
  GithubDownloads,
  GithubContributors,
  GithubForks,
  GithubLanguages,
  GithubLastCommit,
  GithubLicense,
  GithubPackageJsonVersion,
};

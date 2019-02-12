const { GithubCommonValues } = require('./common');

class Github extends GithubCommonValues {
  get imgQueryParams() {
    return { logo: 'github' };
  }
}

class GithubCommitActivity extends Github {

}

class GithubCommitsSince extends Github {

}

module.exports = { GithubCommitActivity };

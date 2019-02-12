const { GithubCommonValues } = require('./common');

class AppVoyer extends GithubCommonValues {
  get imgSrcQuery() {
    return { logo: 'appveyor' };
  }
}

class AppVeyorCi extends AppVoyer {}

class AppVeyorTests extends AppVoyer {}

module.exports = {
  AppVeyorCi,
  AppVeyorTests,
};

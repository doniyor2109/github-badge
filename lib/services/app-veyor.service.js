const { GithubCommonValues } = require('./common');

class AppVeyorCi extends GithubCommonValues {}

class AppVeyorTests extends GithubCommonValues {}

module.exports = {
  AppVeyorCi,
  AppVeyorTests,
};

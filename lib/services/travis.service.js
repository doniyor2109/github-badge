const { GithubCommonValues } = require('./common');

class Travis extends GithubCommonValues {
  get imgQueryParams() {
    return { logo: 'travis' };
  }
}

class TravisBuild extends Travis {}

class TravisPhpVersion extends Travis {}

module.exports = {
  TravisBuild,
  TravisPhpVersion,
};

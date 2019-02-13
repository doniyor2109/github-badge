const { Base } = require('./common');

function parsePackagistName(name) {
  const [user, repo] = name.split('/');
  return {
    user,
    repo,
  };
}

class Packagist extends Base {
  static supporterImgParams = ['user', 'repo'];

  get imgQueryParams() {
    return { logo: 'php' };
  }

  get imgNamedParams() {
    const { composer } = this.data;
    const { user, repo } = parsePackagistName(composer.name);
    return {
      user,
      repo,
    };
  }
}

class PackagistDownloads extends Packagist {}

class PackagistLicense extends Packagist {}

class PackagistPhpVersion extends Packagist {}

class PackagistVersion extends Packagist {}

module.exports = {
  PackagistDownloads,
  PackagistLicense,
  PackagistPhpVersion,
  PackagistVersion,
};

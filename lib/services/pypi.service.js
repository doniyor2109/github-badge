const { Base } = require('./common');

class Pypi extends Base {
  static supporterImgParams = ['packageName'];

  get imgNamedParams() {
    const { pypi } = this.data;
    return {
      packageName: pypi.name,
    };
  }

  get imgQueryParams() {
    return { logo: 'python' };
  }
}

class PypiDjangoVersions extends Pypi {}

class PypiDownloads extends Pypi {}

class PypiFormat extends Pypi {}

class PypiImplementation extends Pypi {}

class PypiLicense extends Pypi {}

class PypiPythonVersions extends Pypi {}

class PypiStatus extends Pypi {}

class PypiVersion extends Pypi {}

class PypiWheel extends Pypi {}

module.exports = {
  PypiDjangoVersions,
  PypiDownloads,
  PypiFormat,
  PypiImplementation,
  PypiLicense,
  PypiPythonVersions,
  PypiStatus,
  PypiVersion,
  PypiWheel,
};

const { Base } = require('./common');

class RequiresIo extends Base {
  static supporterImgParams = ['service', 'user', 'repo', 'user'];

  get imgNamedParams() {
    const { github } = this.data;
    return {
      service: 'github',
      ...github,
    };

  }
}

module.exports = { RequiresIo };

const { Base } = require('./common');

class Bower extends Base {
  supporterImgParams = ['packageName'];

  get imgNamedParams() {
    const { bower } = this.data;
    return {
      packageName: bower && bower.name,
    };
  }
  get imgQueryParams() {
    return { logo: 'bower', logoColor: 'white' };
  }
}

class BowerLicense extends Bower {

}

class BowerVersion extends Bower {

}

module.exports = {
  BowerLicense,
  BowerVersion,
};

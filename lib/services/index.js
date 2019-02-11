module.exports = Object.assign(
  {},
  require('./app-veyor.service'),
  require('./beerpay.service'),
  require('./bower.service'),
  require('./bundlephobia.service'),
  require('./cdnjs.service'),
  require('./circle-ci.service'),
  require('./codecov.service'),
  require('./npm.service'),
  require('./github.service'),
);

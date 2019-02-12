const services = Object.assign(
  {},
  require('./app-veyor.service'),
  require('./beerpay.service'),
  require('./bower.service'),
  require('./bundlephobia.service'),
  require('./cdnjs.service'),
  require('./circle-ci.service'),
  require('./codecov.service'),
  require('./npm.service'),
  require('./node.service'),
  require('./github.service'),
  require('./docker.service'),
  require('./david.service'),
  require('./coveralls.service'),
  require('./depfu.service'),
);

module.exports = services;

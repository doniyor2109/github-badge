const { badgeUrlFromPattern } = require('shields.io/core/badge-urls/make-badge-url');
const { baseUrl } = require('./constants');
const defaultValues = require('./default_value');

function buildUrl(pattern, namedParams, queryParams = {}) {
  try {
    return badgeUrlFromPattern({
      baseUrl,
      pattern,
      namedParams,
      queryParams,
    });
  } catch (e) {
    console.warn('Setting default value for cause of ', e);
    return badgeUrlFromPattern({
      baseUrl,
      pattern,
      namedParams: defaultValues,
      queryParams,
    });
  }
}

function serviceFactory(name, repoInfo) {
  const services = require('./services');
  return new services[name](repoInfo);
}

module.exports = {
  buildUrl,
  serviceFactory,
};

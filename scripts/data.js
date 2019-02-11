const path = require('path');
const fs = require('fs');
const loadLogos = require('shields.io/lib/load-logos');
const loadSimpleIcons = require('shields.io/lib/load-simple-icons');
const { collectDefinitions } = require('shields.io/core/base-service/loader')
const servicesList = require('../lib/services');

const { services, categories } = collectDefinitions();

const logos = {
  ...loadLogos(),
  ...loadSimpleIcons(),
};

const mockConfigs = {
  github: {},
  npm: {},
  maven: {},
  bower: {},
};

function findLogo(name) {
  return Object.keys(logos).find(logo => name.toLowerCase().includes(logo));
}

function writeJSON(filename, data) {
  fs.writeFileSync(
    path.join(__dirname, '../lib', filename),
    JSON.stringify(data)
  );
}

const flattenedServices = services
  .reduce((accum, current, outer) => {
    const { examples, name } = current;
    const logo = findLogo(name);

    return accum.concat(
      examples.map((item, inner) => {
        const { example, queryParams } = item;

        example.queryParams = { ...queryParams, logo };

        return Object.assign(item, {id: `${outer}-${inner}`, name });
      })
    );
  }, [])
  .filter(({ example, name }) => {
    const tokens = Object.keys(example.namedParams);
    const service = servicesList[name];
    return service && tokens.every(key => service.getParams(mockConfigs).hasOwnProperty(key));
  });

const defaultValues = Object.keys(servicesList).reduce((curr, key) => {
  const params = servicesList[key].getParams(mockConfigs);

  for (const param in params) {
    params[param] = 'unknown';
  }
  return {
    ...curr,
    ...params,
  };
}, {});



writeJSON('services_list.json', flattenedServices);
writeJSON('default_value.json', defaultValues);
writeJSON('categories.json', categories);


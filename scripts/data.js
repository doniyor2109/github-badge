const path = require('path');
const fs = require('fs');
const { collectDefinitions } = require('shields.io/core/base-service/loader')
const servicesList = require('../lib/services');

const { services, categories } = collectDefinitions();

const mockConfigs = {
  github: {},
  npm: {},
  maven: {},
  bower: {},
};

function base64(data) {
  return Buffer.from(data).toString('base64');
}

function writeJSON(filename, data) {
  fs.writeFileSync(
    path.join(__dirname, '../lib', filename),
    JSON.stringify(data, null, 2)
  );
}

function flattenServices(services) {
  return services
    .reduce((accum, { examples, name }) => {
      function mapExamples(item) {
        return {
          ...item,
          name,
        };
      }
      return accum.concat(examples.map(mapExamples));
    }, [])
}

const flattenedServices = flattenServices(services)
  .filter(({ example, name }) => {
    const tokens = Object.keys(example.namedParams);
    const service = servicesList[name];
    return service && tokens.every(key => new service(mockConfigs).imgNamedParams.hasOwnProperty(key));
  })
  .map(({ id, title, name, example: { pattern, queryParams } }) => ({
    id: base64(`${name}${title}${pattern}`),
    name,
    title,
    img: {
      pattern,
      queryParams,
    },
  }));

const defaultValues = Object.keys(servicesList).reduce((curr, key) => {
  const service = servicesList[key];
  const params = new service(mockConfigs).imgNamedParams;

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


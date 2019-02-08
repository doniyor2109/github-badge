const { flattenedServices } = require('../lib/data');

const defaultValues = {};

for (const key in flattenedServices) {
  const { example } = flattenedServices[key];

  for (const paramName in example.namedParams) {
    defaultValues[paramName] = '___UNDEFINED___';
  }
}

console.log(defaultValues);

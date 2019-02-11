const path = require('path');
const fs = require('fs');
const loadLogos = require('shields.io/lib/load-logos');
const loadSimpleIcons = require('shields.io/lib/load-simple-icons');
const { collectDefinitions } = require('shields.io/core/base-service/loader')

const { services, categories } = collectDefinitions();

const logos = {
  ...loadLogos(),
  ...loadSimpleIcons(),
};

const supportedParams = [
  'NodeVersion_packageName',
  'NpmCollaborators_packageName',
  'NpmDownloads_packageName',
  'Jitpack_artifactId',
  'Jitpack_groupId',
  'MavenCentral_groupId',
  'MavenCentral_artifactId',
  'Coveralls_vcsType',
  'Codecov_vcsName',
  'CircleCi_vcsType',
  'CircleCi_owner',
  'CircleCi_repo',
  'CircleCi_branch',
];

const defaultValues = supportedParams.reduce((current, key) => {
  current[key] = '__UNDEFINED__';
  return current;
}, {});

const flattenedServices = services
  .reduce((accum, current, outer) => {
    const { examples, name } = current;

    const logo = Object.keys(logos).find(logo => name.toLowerCase().includes(logo));

    return accum.concat(
      examples.map((item, inner) => {
        const { example, queryParams } = item;
        const namedParams = {};

        for (const param in example.namedParams) {
          example.pattern = example.pattern.replace(param, `${name}_${param}`);
          namedParams[`${name}_${param}`] = '_UNDEFINED_';
        }
        example.namedParams = namedParams;
        example.queryParams = { ...queryParams, logo };

        return Object.assign(item, {id: `${outer}-${inner}`, name });
      })
    );
  }, [])
  .filter(({ example }) => {
    const tokens = Object.keys(example.namedParams);
    return tokens.every(i => supportedParams.includes(i));
  });


function writeJSON(filename, data) {
  fs.writeFileSync(
    path.join(__dirname, '../lib', filename),
    JSON.stringify(data)
  );
}

writeJSON('services.json', flattenedServices);
writeJSON('default_value.json', defaultValues);
writeJSON('categories.json', categories);


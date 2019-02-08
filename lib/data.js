import { services, categories } from 'shields.io/service-definitions.yml';

export { categories, services };

const supportedParams = [
  'Coveralls_vcsType',
  'Codecov_vcsName',
  'NodeVersion_packageName',
  'NpmCollaborators_packageName',
  'NpmDownloads_packageName',
];

export const defaultValues = supportedParams.reduce((current, key) => {
  current[key] = '__UNDEFINED__';
  return current;
}, {});

export const flattenedServices = services
  .reduce((accum, current, outer) => {
    const { examples, name } = current
    return accum.concat(
      examples.map((item, inner) => {
        const { example, } = item;
        const namedParams = {};

        for (const param in example.namedParams) {
          example.pattern = example.pattern.replace(param, `${name}_${param}`);
          namedParams[`${name}_${param}`] = example.namedParams[param];
        }
        example.namedParams = namedParams;

        return Object.assign(item, current, {id: `${outer}-${inner}`});
      })
    );
  }, [])
  .filter(({ example }) => {
    const tokens = Object.keys(example.namedParams);
    return tokens.every(i => supportedParams.includes(i));
  });


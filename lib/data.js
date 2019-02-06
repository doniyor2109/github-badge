import { services, categories } from 'shields.io/service-definitions.yml';

export { categories, services };

const supportedParams = 'vcsName|repo|user|packageName|branch'.split('|');

export const flattenedServices = services
  .reduce((accum, current, outer) => {
    const { examples, ...rest } = current
    return accum.concat(examples.map((item, inner) => Object.assign(item, rest, {id: `${outer}-${inner}`})))
  }, [])
  .filter(({ example }) => {
    const tokens = Object.keys(example.namedParams);
    return tokens.every(i => supportedParams.includes(i));
  });


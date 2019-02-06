import { services, categories } from 'shields.io/service-definitions.yml';

export { categories, services };

export const flattenedServices = services.reduce((accum, current, outer) => {
  const { examples, ...rest } = current
  return accum.concat(examples.map((item, inner) => Object.assign(item, rest, {id: `${outer}-${inner}`})))
}, []);

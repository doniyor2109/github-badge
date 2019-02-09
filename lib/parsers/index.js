import { xmlParser } from './xml';
import { yamlParser } from './yaml';
import { jsonParser } from './json';

export default {
  json: jsonParser,
  xml: xmlParser,
  yaml: yamlParser,
  yml: yamlParser,
};

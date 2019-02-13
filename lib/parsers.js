import yaml from 'js-yaml';
import xml from 'xml2js'

export function jsonParser(res) {
  return res.json();
}

export async function yamlParser(res) {
  const text = await res.text();
  return yaml.safeLoad(text);
}

export async function xmlParser(res) {
  const text = await res.text();
  return new Promise((resolve, reject) => {
    xml.parseString(text, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export async function pythonParser(res) {
  const text = await res.text();
  let match;
  const result = {};
  while(match = text.match(/(\w+?)=["'](.*?)["']/)) {
    result[match[1]] = match[2];
  }
  return result;
}

export default {
  xml: xmlParser,
  yaml: yamlParser,
  yml: yamlParser,
  json: jsonParser,
  py: pythonParser,
};

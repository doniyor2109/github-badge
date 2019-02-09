import yaml from 'js-yaml';

export async function yamlParser(res) {
  const text = await res.text();
  return yaml.safeLoad(text);
}

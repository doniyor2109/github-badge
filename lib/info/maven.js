import { fetchFile } from '../utils';

export async function getPomFile() {
  return await fetchFile('pom.xml');
}

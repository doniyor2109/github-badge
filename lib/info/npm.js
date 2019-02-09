import { fetchFile } from '../utils';

export async function getPackageJson() {
  return await fetchFile('package.json');
}

import { fetchFile } from '../utils';

export async function getTravisInfo() {
  return await fetchFile('.travis.yml');
}

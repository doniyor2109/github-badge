import { fetchFile } from '../utils';

export async function getCircleciFile() {
  return await fetchFile('.circleci/config.yml');
}

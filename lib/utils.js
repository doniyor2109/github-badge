import { badgeUrlFromPattern } from 'shields.io/core/badge-urls/make-badge-url'
import { baseUrl } from './constants'
import { defaultValues } from './data'
import parsers from './parsers'

export function buildUrl(pattern, namedParams) {
  try {
    return badgeUrlFromPattern({
      baseUrl,
      pattern,
      namedParams,
    });
  } catch (e) {
    return badgeUrlFromPattern({
      baseUrl,
      pattern,
      namedParams: defaultValues,
    });
  }
}

export function githubRawPath(path) {
  const { getRepoInfo, getCurrentBranchName } = require('./info/github');
  const {user, repo} = getRepoInfo();
  const branch = getCurrentBranchName();
  return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`
}

export async function fetchFile(path) {
  const ext = path.split('.').pop();

  if (!parsers[ext]) {
    throw new Error(`.${ext} file is not supported`);
  }

  try {
    const response = await fetch(githubRawPath(path));
    return await parsers[ext](response);
  } catch (e) {
    return null;
  }
}

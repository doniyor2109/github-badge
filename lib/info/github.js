export function getRepoInfo() {
  const [, user, repo] = window.location.pathname.split('/');
  return { user, repo };
}

export function getCurrentBranchName() {
  const path = window.location.pathname;
  const matches = path.match(/tree\/([^?\/]+)/);
  return matches && matches[1] || 'master';
}

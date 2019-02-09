import { getCircleciFile } from './circle-ci';
import { getTravisInfo } from './travis';
import { getPomFile } from './maven';
import { getPackageJson } from './npm';
import { getCurrentBranchName, getRepoInfo } from './github';

export async function getInfo() {
  const { user: githubUser, repo: githubRepo } = getRepoInfo();
  const npmPkg = await getPackageJson();
  const travis = await getTravisInfo();
  const pom = await getPomFile();
  const circleCi = await getCircleciFile();
  const githubBranch = getCurrentBranchName();
  const npmPackageName = npmPkg && npmPkg.name;
  const artifactId = pom && pom.project.artifactId.join('');
  const groupId = pom && pom.project.groupId.join('');
  return {
    'NodeVersion_packageName': npmPackageName,
    'NpmCollaborators_packageName': npmPackageName,
    'NpmDownloads_packageName': npmPackageName,
    'Jitpack_artifactId': artifactId,
    'Jitpack_groupId': groupId,
    'MavenCentral_groupId': groupId,
    'MavenCentral_artifactId': artifactId,
    'Coveralls_vcsType': 'github',
    'Codecov_vcsName': 'github',
    'CircleCi_vcsType': 'github',
    'CircleCi_owner': githubUser,
    'CircleCi_repo': githubRepo,
    'CircleCi_branch': githubBranch,
  };
}

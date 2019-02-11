class GithubCommonValues {
  static getParams({ github }) {
    return {
      user: github.user,
      repo: github.repo,
      branch: github.branch,
    };
  }
}

class NpmCommonValues {
  static getParams({ npm }) {
    return {
      packageName: npm && npm.name,
    };
  }
}

class MavenCommonValues {
  static getParams({ maven }) {
    return {
      artifactId: maven && maven.project.artifactId.join(''),
      groupId: maven && maven.project.groupId.join(''),
    };
  }
}

module.exports = {
  GithubCommonValues,
  NpmCommonValues,
  MavenCommonValues,
};

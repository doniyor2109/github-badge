class DockerStars {
  static getParams({ github }) {
    return {
      user: github.user,
      repo: github.repo,
    };
  }
}

class DockerAutomatedBuild {
  static getParams({ github }) {
    return {
      user: github.user,
      repo: github.repo,
    };
  }
}

class DockerBuild {
  static getParams({ github }) {
    return {
      user: github.user,
      repo: github.repo,
    };
  }
}

class DockerPulls {
  static getParams({ github }) {
    return {
      user: github.user,
      repo: github.repo,
    };
  }
}

module.exports = {
  DockerStars,
  DockerPulls,
  DockerBuild,
  DockerAutomatedBuild,
};

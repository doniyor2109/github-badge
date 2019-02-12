const { Base } = require('./common');

class Docker extends Base {
  get imgNamedParams() {
    const { github } = this.data;
    return {
      user: github.user,
      repo: github.repo,
    };
  }
  get imgQueryParams() {
    return { logo: 'docker' };
  }
}

class DockerStars extends Docker {

}

class DockerAutomatedBuild extends Docker{

}

class DockerBuild extends Docker {

}

class DockerPulls extends Docker {

}

module.exports = {
  DockerStars,
  DockerPulls,
  DockerBuild,
  DockerAutomatedBuild,
};

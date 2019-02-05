async function getPackageJson(userName, repoName) {
  try {
    const response = await fetch(`https://raw.githubusercontent.com/${userName}/${repoName}/master/package.json`);
    return await response.json();
  } catch (e) {
    return null;
  }
}

async function getRepoInfo() {
  const [, userName, repoName] = window.location.pathname.split('/');
  const pkg = await getPackageJson(userName, repoName);

  return {
    npm: pkg,
    repo: {
      name: repoName,
      userName,
    },
  };
}

const badges = {
  github: {
    codeSize(repoInfo) {
      return `https://img.shields.io/github/languages/code-size/${repoInfo.repo.userName}/${repoInfo.repo.name}.svg?style=flat`
    }
  },
  npm: {
    downloads(repoInfo) {
      if (!repoInfo.npm) {
        return '';
      }
      return `https://img.shields.io/npm/dt/${repoInfo.npm.name}.svg?style=flat`
    }
  }
};

function createBadgeElement(url) {
  const anchor = document.createElement('a');
  const img = document.createElement('img');

  img.src = url;
  img.style.maxWidth = '100%';
  img.style.marginLeft = '5px';

  anchor.href = '/';
  anchor.append(img);

  return anchor;
}

function getContainer() {
  const existing =
    document.querySelector(`.markdown-body.entry-content [data-canonical-src^="https://img.shields.io/badge/"]`) ||
    document.querySelector(`.markdown-body.entry-content [data-canonical-src*="badge.svg"]`);

  if (existing) {
    return existing.parentNode.parentNode;
  }

  const header = document.querySelector('.markdown-body.entry-content h1');

  if (header) {
    const newContainer = document.createElement('p');

    header.append(newContainer);

    return newContainer;
  }

  return document.querySelector('.markdown-body.entry-content');
}

window.addEventListener('load', async function() {
  const repoInfo = await getRepoInfo();

  getContainer().append(
    createBadgeElement(badges.github.codeSize(repoInfo)),
    createBadgeElement(badges.npm.downloads(repoInfo)),
  );
});


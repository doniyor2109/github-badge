import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Badge } from 'shields.io/frontend/components/common';
import { Icon, List, Switch, Input, Tag } from 'antd'

import 'antd/dist/antd.css';

import { getStore, setStore } from './store';
import defaultValues from './default_value';
import services from './services_list';
import categories from './categories';
import { addBadgeMessage, removeBadgeMessage, REPO_INFO, getPepoInfoMessage } from './message';
import { sendMessageToAllTabs, sendMessageToTab, onRuntimeMessage, getActiveTab } from './chrome';
import { serviceFactory } from './utils'

function RepoLink() {
  return (
    <a href="https://github.com/doniyor2109/github-badge" target="_blank">
      <Icon type="github" style={{ color: '#000' }} /> Feedback?
    </a>
  );
}

function Categories({ activeCategory, onClick, categories }) {
  return (
    <div style={{ margin: '10px 0'}}>
      {categories.map(({ id, name }) => (
        <Tag
          key={id}
          onClick={() => onClick(id)}
          color={activeCategory === id && "blue"}
          children={name}
        />
      ))}
    </div>
  );
}

function Container({ children }) {
  return (
    <div
      style={{
        padding: 10,
        width: 400,
        height: 600,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>

    )
}

function Header({ children }) {
  return (
    <div style={{ flex: 0 }}>
      {children}
    </div>
  );
}

function Footer({ children }) {
  return (
    <div style={{ flex: 0, justifyItems: 'flex-end' }}>
      {children}
    </div>
  )
}

function App() {
  const [repoInfo, setRepoInfo] = useState(null);
  const [activeCategory, setCategory] = useState(null);
  const [search, setSearch] = useState(null);
  const [activeBadges, setActiveBadges] = useState([]);

  useEffect(() => {
    getStore('activeBadges', [], (badges) => {
      setActiveBadges(badges);
    });
    getActiveTab().then((tab) => {
      sendMessageToTab(tab.id, getPepoInfoMessage());
    });
    onRuntimeMessage(function(message) {
      if (message.type === REPO_INFO) {
        setRepoInfo(message.payload);
      }
    });
  }, []);

  function saveActiveBadges(badges) {
    setActiveBadges(badges);
    setStore('activeBadges', badges);
  }

  function addActiveBadge(id) {
    sendMessageToAllTabs(addBadgeMessage(id));
    saveActiveBadges(activeBadges.concat(id));
  }

  function removeActiveBadge(id) {
    sendMessageToAllTabs(removeBadgeMessage(id));
    saveActiveBadges(activeBadges.filter((item) => item !== id));
  }

  function toggleBadge(id) {
    if (activeBadges.includes(id)) {
      removeActiveBadge(id);
    } else {
      addActiveBadge(id);
    }
  }

  function renderItem(example) {
    const { name  } = example;
    const service = serviceFactory(name, repoInfo);
    const url = service.buildImgUrl();

    return (
      <List.Item
        key={example.id}
        actions={[
          <Switch
            key={example.id}
            checked={activeBadges.includes(example.id)}
            onChange={() => {
              toggleBadge(example.id);
            }}
          />
        ]}
      >
        <List.Item.Meta
          title={example.title}
          description={<Badge src={url} /> }
        />
      </List.Item>
    )
  }

  const data = useMemo(() => {
    return services.filter((item) => {
      function matchesWithSearch() {
        return item.title.toLowerCase().includes(search.toLowerCase());
      }
      function matchesWithCategory() {
        return item.category === activeCategory
      }
      if (search && activeCategory) {
        return matchesWithSearch() && matchesWithCategory();
      }
      if (search) {
        return matchesWithSearch();
      }
      if (activeCategory) {
        return matchesWithCategory();
      }
      return true;
    })
  }, [activeCategory, search]);

  return (
    <Container>
      <Header>
        <Input
          placeholder="Search..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />

        {/*<Categories
          activeCategory={activeCategory}
          categories={categories}
          onClick={(id) => {
            if (id === activeCategory) {
              setCategory(null);
            } else {
              setCategory(id);
            }
          }}
        />*/}
      </Header>

      <List
        style={{ height: '90vh', overflow: 'scroll', paddingRight: 15 }}
        dataSource={data}
        renderItem={renderItem}
      />

      <Footer>
        <RepoLink />
      </Footer>
    </Container>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

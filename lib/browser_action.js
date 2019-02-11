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
import { buildUrl } from './utils'

function RepoLink() {
  return (
    <a href="https://github.com/doniyor2109/github-badge" target="_blank">
      <Icon type="github" style={{ color: '#000' }} /> Feedback?
    </a>
  );
}

function App() {
  const [repoInfo, setRepoInfo] = useState(defaultValues);
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
    const { name, example: { pattern, queryParams } } = example;
    const url = buildUrl(pattern, repoInfo[name], queryParams);

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
    <div style={{ padding: 10, width: 400, height: 600, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 0 }}>
        <Input
          placeholder="Search..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />

        <div style={{ margin: '10px 0'}}>
          {categories.map(({ id, name }) => (
            <Tag
              key={id}
              onClick={() => {
                if (id === activeCategory) {
                  setCategory(null);
                } else {
                  setCategory(id);
                }
              }}
              color={activeCategory === id && "blue"}
              children={name}
            />
          ))}
        </div>
      </div>

      <List
        style={{ height: '80vh', overflow: 'scroll', paddingRight: 15 }}
        dataSource={data}
        renderItem={renderItem}
      />

      <div style={{ flex: 0, justifyItems: 'flex-end' }}>
        <RepoLink />
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

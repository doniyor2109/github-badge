import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { services, categories } from 'shields.io/service-definitions.yml';
import { staticBadgeUrl } from 'shields.io/core/badge-urls/make-badge-url';
import { Badge } from 'shields.io/frontend/components/common';
import { List, Switch } from 'antd';
import { Input } from 'antd';
import { Tag } from 'antd';

import 'antd/dist/antd.css';

const flattenedServices = services.reduce((accum, current, outer) => {
  const { examples, ...rest } = current
  return accum.concat(examples.map((item, inner) => Object.assign(item, rest, {id: `${outer}-${inner}`})))
}, []);

const baseUrl = "https://img.shields.io";

function App() {
  const [activeCategory, setCategory] = useState(null);
  const [search, setSearch] = useState(null);
  const [activeBadges, setActiveBadges] = useState([]);

  function setActiveBadge(id) {
    setActiveBadges(activeBadges.concat(id));
  }

  function removeActiveBadge(id) {
    setActiveBadges(activeBadges.filter((item) => item !== id));
  }

  function toggleBadge(id) {
    if (activeBadges.includes(id)) {
      removeActiveBadge(id);
    } else {
      setActiveBadge(id);
    }
  }

  function renderItem(example) {
    const { preview } = example
    const { label, message, color, style, namedLogo } = preview

    const previewUrl = staticBadgeUrl({
      baseUrl,
      label,
      message,
      color,
      style,
      namedLogo,
    });
    return (
      <List.Item
        key={example.id}
        actions={[
          <Switch
            key={`${example.title} ${previewUrl}`}
            checked={activeBadges.includes(example.id)}
            onChange={() => {
              toggleBadge(example.id);
            }}
          />
        ]}
      >
        <List.Item.Meta
          title={example.title}
          description={ <Badge src={previewUrl} /> }
        />
      </List.Item>
    )
  }

  const getData = useCallback(() => {
    return flattenedServices.filter((item) => {
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

  function handleSearch(e) {
    if (e.target.value==='') {
      setSearch(null);
    } else {
      setSearch(e.target.value);
    }
  }
  const data = getData();
  return (
    <div style={{ padding: 10, width: 400, height: 600, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 0 }}>
        <Input
          placeholder="Search..."
          onChange={handleSearch}
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
            >
              {name}
            </Tag>
          ))}
        </div>
      </div>

      <List
        style={{ height: '80vh', overflow: 'scroll' }}
        dataSource={data}
        renderItem={renderItem}
      />
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));



import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { services, categories } from 'shields.io/service-definitions.yml';
import { staticBadgeUrl } from 'shields.io/core/badge-urls/make-badge-url.js';
import { Badge } from 'shields.io/frontend/components/common.js';
import { List, Switch } from 'antd';
import { Input } from 'antd';
import { Tag, Row, Col } from 'antd';

import 'antd/dist/antd.css';

const flattenedServices = services.reduce((accum, current) => {
  const { examples, ...rest } = current
  return accum.concat(examples.map((item) => Object.assign(item, rest)))
}, []);

const baseUrl = "https://img.shields.io";

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
    <List.Item key={`${example.title} ${previewUrl}`} actions={[<Switch key={`${example.title} ${previewUrl}`} />]}>
      <List.Item.Meta
        title={example.title}
        description={ <Badge src={previewUrl} /> }
      />
    </List.Item>
  )
}

function App() {
  const [activeCategory, setCategory] = useState(null);
  const [search, setSearch] = useState(null);

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
    <div style={{ padding: 20 }}>
      <List
        header={
          <div>
            <Input
              onChange={handleSearch}
              value={search}
            />

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
        }
        dataSource={data}
        renderItem={renderItem}
      />
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));



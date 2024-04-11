import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, List, Card } from 'antd';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`http://localhost:5000/search?q=${query}`);
      setResults(data.RelatedTopics);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={search} style={{ marginBottom: '20px' }}>
        <Input.Search
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          enterButton="Search"
          size="large"
          onSearch={search}
        />
      </form>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={results}
        renderItem={item => (
          <List.Item>
            <Card title={<a href={item.FirstURL}>{item.FirstURL}</a>}>{item.Text}</Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Search;

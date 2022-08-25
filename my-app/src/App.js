import logo from './logo.svg';
import * as React from 'react';

const title = 'React'

import './App.css';

function App() {
  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search />

      <hr />

      <List />
    </div>
  );
}

function Search() {
  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input id="search" type="text" />
    </div>
  );
}

const list = [... ];

function App() { ... }

function List() {
  return (
    <ul>
      {list.map(function(item) {
        return (
          <li key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default App;

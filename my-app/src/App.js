import * as React from 'react';

const welcome = {
  title: 'React',
  greeting: 'Hey'
}

function App() {
  return (
    <div>
      <h1>
        Hello {welcome.title} {welcome.greeting}
      </h1>

      # leanpub-start-insert
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
      # leanpub-end-insert
    </div>
  );
}

export default App;


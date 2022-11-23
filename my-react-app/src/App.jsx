import * as React from 'react';
import { useEffect, useState } from 'react';

const useStorageState = (key, initialState) => {

  const [value, setValue] = useState(localStorage.getItem(key) || initialState
  );

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const [stories, dispatchSories] = React.useReducer(
    storiesReducer,
    []
  ); 
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    
    setIsLoading(true);
    
    getAsyncStories()
    .then(result => {
        dispatchSories({
          type: 'SET_STORIES',
          payload: result.data.stories
        });
      
      setIsLoading(false);
    })
    .catch(() => setIsError(true));
  }, []);

  const getAsyncStories = () => new Promise.resolve({ data: { stories: initialStories } });

  const storiesReducer = (state, action) => {
    switch (action.type) {
      case 'SET_STORIES':
      return  action.payload;
      case 'REMOVE_STORY':
      return state.filter(
          (story) => action.payload.objectID !== story.objectID
        );
      default:
      throw new Error();
    }  };

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

  const handleRemoveStory = (item) => {
    dispatchSories({
      type: 'REMOVE_STORY',
      payload: item,
    });
    
    dispatchSories({
      type: 'SET_STORIES',
      payload: newStories,
    });

  }

  useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search</strong>

      </InputWithLabel>

      <hr />
      {isError && <p>Something went wrong ...</p>}
      
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
      <List 
  list={searchedStories} 
  onRemoveItem={handleRemoveStory} 
      />
    )}
    </div>
  );
};

const InputWithLabel = ({ id, value, type = "text", onInputChange, isFocused, children, }) => {

  const inputRef = React.useRef();

  if (isFocused && inputRef.current) {
    inputRef.current.focus()
  }




  return (
    <>
      <label htmlFor={id}>{children}: </label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        autoFocus={isFocused}
        onChange={onInputChange}
      />
    </>
  )
};

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item
        key={item.objectID}
        item={item}
        onRemoveItem={onRemoveItem}
      />
    ))}
  </ul>
);

const Item = ({ item, onRemoveItem }) => {

  return (
    <li>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button type='button' onClick={() => onRemoveItem(item)}>
          Dismiss
        </button>
      </span>
    </li>
  );
};

export default App;

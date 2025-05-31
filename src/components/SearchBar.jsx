'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../app/App.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // Do something with searchTerm, like filter a list or call an API
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Games"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <FontAwesomeIcon
        className="searchbar-mag"
        icon={faMagnifyingGlass}
        size="lg"
      />
    </div>
  );
}

export default SearchBar;

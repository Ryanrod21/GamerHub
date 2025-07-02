'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (trimmed.length > 0) {
      router.push(`/search?query=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div
      className="search-bar"
      style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
    >
      <input
        type="text"
        placeholder="Search Games"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
      <FontAwesomeIcon
        className="searchbar-mag"
        icon={faMagnifyingGlass}
        size="lg"
        onKeyDown={handleKeyPress}
        onClick={handleSearch}
      />
    </div>
  );
}

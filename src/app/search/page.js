'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { searchGames } from '@/RAWG/rawg';
import Link from 'next/link';
import './search.css';

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const parentPlatforms = searchParams.get('platforms') || '';
  const router = useRouter();

  const query = searchParams.get('query');
  const sort = searchParams.get('sort') || ''; // default: no sort

  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1); // <-- add page state
  const [nextPage, setNextPage] = useState(null); // track if next page exists
  const [prevPage, setPrevPage] = useState(null); // track if prev page exists

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      const data = await searchGames(query, sort, page, parentPlatforms);
      setResults(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    };

    fetchResults();
  }, [query, sort, page, parentPlatforms]);

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    router.push(
      `/search?query=${encodeURIComponent(query)}&sort=${selectedSort}`
    );
  };

  if (!query) return <p>No search term provided.</p>;

  return (
    <div className="search-hero">
      <h1>Search Results for "{query}"</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sort} onChange={handleSortChange}>
          <option value="">Default</option>
          <option value="-rating">Highest Rated</option>
          <option value="rating">Lowest Rated</option>
          <option value="-released">Newest</option>
          <option value="released">Oldest</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="platforms">Filter by Platform: </label>
        <select
          id="platforms"
          value={parentPlatforms}
          onChange={(e) => {
            const selected = e.target.value;
            router.push(
              `/search?query=${encodeURIComponent(
                query
              )}&sort=${sort}&platforms=${selected}`
            );
          }}
        >
          <option value="">All</option>
          <option value="1">PC</option>
          <option value="2">PlayStation</option>
          <option value="3">Xbox</option>
          <option value="4">iOS</option>
          <option value="8">Nintendo</option>
          {/* Add more as needed */}
        </select>
      </div>

      <ul>
        {results.map((game) => (
          <li key={game.id}>
            <Link href={`/games-list/${game.id}`}>
              <div className="search-card">
                <h4>{game.name}</h4>
                {game.background_image && (
                  <img
                    src={game?.background_image || '/noPic.png'}
                    alt={game.name}
                    style={{
                      width: '500px',
                      height: '300px',
                      display: 'block',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={!prevPage}
          className="prev-button"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!nextPage}
          style={{ marginLeft: '10px' }}
          className="next-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

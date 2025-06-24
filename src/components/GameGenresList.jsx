'use client';

// ExampleComponent.jsx
import { useEffect, useState } from 'react';
import { getGameGenres, getGamesByGenres } from '@/RAWG/rawg';
import GameDetails from './GameDetails';
import Link from 'next/link';

function GameGenres() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1); // <-- add page state
  const [nextPage, setNextPage] = useState(null); // track if next page exists
  const [prevPage, setPrevPage] = useState(null); // track if prev page exists
  const [loading, setLoading] = useState(false);

  // New states for game details
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    async function loadGenres() {
      const data = await getGameGenres();
      setGenres(data.results);
    }
    loadGenres();
  }, []);

  useEffect(() => {
    if (!selectedGenre) return;

    async function loadGamesByGenres() {
      setLoading(true);
      try {
        const data = await getGamesByGenres(selectedGenre, page);
        setGames(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadGamesByGenres();
  }, [selectedGenre, page]);

  // Reset page and game detail when changing genre
  useEffect(() => {
    setPage(1);
    setSelectedGameId(null);
  }, [selectedGenre]);

  // Go back from games list to genres
  function backToGenres() {
    setSelectedGenre(null);
    setPage(1);
    setSelectedGameId(null);
  }

  if (!selectedGenre) {
    // Show genre list
    return (
      <div className="genre-container">
        {genres.map((genre) => (
          <div
            key={genre.id}
            className="genre-card"
            onClick={() => setSelectedGenre(genre.slug)}
            style={{ cursor: 'pointer' }}
          >
            <h3>{genre.name}</h3>
            <img
              src={genre.image_background}
              alt={genre.name}
              style={{
                width: '500px',
                height: '300px',
                borderRadius: '8px',
                objectFit: 'cover',
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  // Show games list with pagination and clickable games
  return (
    <div className="games-genre">
      <div className="games-genre-head">
        <button className="back-genre-button" onClick={backToGenres}>
          ← Back to Genres
        </button>
        <h2>Games in {selectedGenre}</h2>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="games-container">
            {games.map((game) => (
              <Link href={`/games-list/${game.id}`} key={game.id}>
                <div
                  className="game-card"
                  onClick={() => setSelectedGameId(game.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <h4>{game.name}</h4>
                  {game.background_image && (
                    <img
                      src={game.background_image}
                      alt={game.name}
                      style={{
                        width: '500px',
                        height: '300px',
                        borderRadius: '8px',
                      }}
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>
          <div className="next-prev-button">
            {prevPage && (
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={!prevPage}
              >
                Previous
              </button>
            )}
            {nextPage && (
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!nextPage}
                style={{ marginLeft: '10px' }}
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default GameGenres;

'use client';

// ExampleComponent.jsx
import { useEffect, useState } from 'react';
import { fetchPopularGames } from '@/RAWG/rawg';

function PopularGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function loadGames() {
      const data = await fetchPopularGames();
      setGames(data.results);
    }
    loadGames();
  }, []);

  return (
    <div className="games-container">
      {games.map((game) => (
        <div key={game.id} className="game-card">
          <h2>{game.name}</h2>
          {game.background_image && (
            <img
              src={game.background_image}
              alt={game.name}
              style={{ width: '300px', borderRadius: '8px' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default PopularGames;

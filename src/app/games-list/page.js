'use client';

import './games-list.css';
import GameGenres from '@/components/GameGenresList';

const GamesListPage = () => {
  return (
    <div className="gamelist-page">
      <h1> Games List </h1>

      <GameGenres />
    </div>
  );
};

export default GamesListPage;

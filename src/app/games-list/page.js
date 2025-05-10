'use client';

import Navbar from '@/sections/NavBar';
import GameCat from '../../data/GameCat';
import ProfileData from '@/data/ProfileData';
import SideHero from '@/sections/SideHero';
import './games-list.css';

const renderedGames = GameCat.map((game, index) => {
  const letters = game.type.split('');
  return (
    <div className="game-item" key={index} style={game.thebackground}>
      <span className="game-text">
        {letters.map((letter, i) => (
          <span key={i} style={{ '--i': i }}>
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </span>
    </div>
  );
});

const GamesListPage = () => {
  return (
    <div>
      <div className="gamelist-page">
        
        <div className="game-list-container">
          
          <div className="game-list-hero">
            <div className="game-list-head">
              <h1>Games list</h1>
              <h3>Choose your game type</h3>
            </div>
            <div className="game-main">
              <div className="rendered-games-list">{renderedGames}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesListPage;

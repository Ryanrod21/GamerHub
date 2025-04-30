import GameCat from '../../data/GameCat';

import '../App.css';

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
  return <div className="game-list-container">{renderedGames}</div>;
};

export default GamesListPage;

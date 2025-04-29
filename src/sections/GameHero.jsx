import GameHeroCard from '../components/GameHeroCard';

import '../app/App.css';

function GameHero({ GameData }) {
  return (
    <div className="GameHeroContainer">
      <h3>You Might Also Like</h3>
      <GameHeroCard GameData={GameData} />
    </div>
  );
}

export default GameHero;

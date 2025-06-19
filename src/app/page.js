'use client';

import './App.css';

import GameHero from '../sections/GameHero';
import MainNews from '../sections/MainNews';

function App() {
  return (
    // <div className="Nav-SideHero">

    <div className="MainHero">
      <div className="Inner-MainHero">
        <MainNews />
      </div>
      <GameHero />
    </div>

    // </div>
  );
}

export default App;

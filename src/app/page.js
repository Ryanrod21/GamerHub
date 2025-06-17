'use client';

import './App.css';

import ShowMusic from '../sections/ShowMusic';

import GameHero from '../sections/GameHero';
import MainNews from '../sections/MainNews';

import MusicData from '../data/MusciData';
import GameNewsData from '../data/GameNewsData';

function App() {
  return (
    // <div className="Nav-SideHero">

    <div className="MainHero">
      <div className="Inner-MainHero">
        <MainNews GameNewsData={GameNewsData} />
        <ShowMusic MusicData={MusicData} />
      </div>
      <GameHero />
    </div>

    // </div>
  );
}

export default App;

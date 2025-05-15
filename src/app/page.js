'use client';
import { useState } from 'react';

import './App.css';

import ShowMusic from '../sections/ShowMusic';

import NavBar from '../sections/NavBar';
import SideHero from '../sections/SideHero';
import GameHero from '../sections/GameHero';
import MainNews from '../sections/MainNews';

import ProfileData from '../data/ProfileData';
import GameData from '../data/GameData';
import MusicData from '../data/MusciData';
import GameNewsData from '../data/GameNewsData';
import NotificationData from '../data/NotificationData';

function App() {
  return (
    // <div className="Nav-SideHero">

    <div className="MainHero">
      <div className="Inner-MainHero">
        <MainNews GameNewsData={GameNewsData} />
        <ShowMusic MusicData={MusicData} />
      </div>
      <GameHero GameData={GameData} />
    </div>
    // </div>
  );
}

export default App;

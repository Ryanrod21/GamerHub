'use client'
import { useState } from 'react';

import './App.css';

import ShowAlarm from '../sections/ShowAlarm';
import ShowMusic from '../sections/ShowMusic';
import ShowStream from '../sections/ShowStream';
import NavBar from '../sections/NavBar';
import SideHero from '../sections/SideHero';
import CreateList from '../sections/CreateList';
import ItemList from '../sections/ItemList';
import GameHero from '../sections/GameHero';
import MainNews from '../sections/MainNews';

import ProfileData from '../data/ProfileData';
import GameData from '../data/GameData';
import MusicData from '../data/MusciData';
import GameNewsData from '../data/GameNewsData';

function App() {
  const [list, setList] = useState([]);

  const onEditList = (id, newItem) => {
    const updateItem = list.map((edit) => {
      if (edit.id === id) {
        return { ...edit, item: newItem };
      }
      return edit;
    });

    setList(updateItem);
  };

  const addList = ({ item }) => {
    const updateItem = [
      ...list,
      { id: Math.round(Math.random() * 9999), item },
    ];

    setList(updateItem);
  };

  const handleRemove = (id) => {
    const updateList = list.filter((item) => {
      return item.id !== id;
    });
    setList(updateList);
  };

  return (
    <div>
      <div className="Nav-SideHero">
        <SideHero ProfileData={ProfileData} />

        <div className="MainHero">
          <NavBar />
          <div className="Inner-MainHero">
            <MainNews GameNewsData={GameNewsData} />
            <ShowMusic MusicData={MusicData} />
          </div>
          <GameHero GameData={GameData} />
        </div>
      </div>
      {/* <ShowAlarm />
      <CreateList onCreate={addList} />
      <ItemList onList={list} onRemove={handleRemove} onEditList={onEditList} />
      <ShowStream /> */}
    </div>
  );
}

export default App;

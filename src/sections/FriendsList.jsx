'use client';

import { useState } from 'react';
import FriendsCard from '../components/FriendsCard';
import '../app/App.css';

function FriendsList({ ProfileData }) {
  const [showPopup, setPopup] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const togglePopup = () => setPopup(!showPopup);

  const handleInputChange = (e) => setInputValue(e.target.value);

  return (
    <>
      <div className="FriendsPanel">
        <div className="OnlinePlus">
          <p>Friends List</p>
          <span className="addBtn" onClick={togglePopup}>
            +
          </span>
        </div>

        {showPopup && (
          <div className="popup-box">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Add Friend"
            />
          </div>
        )}
      </div>
      <FriendsCard ProfileData={ProfileData} />
    </>
  );
}

export default FriendsList;

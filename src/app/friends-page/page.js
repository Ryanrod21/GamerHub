'use client';

import ProfileData from '@/data/ProfileData';

import './friends-page.css';
import FriendsCard from '@/components/FriendsCard';
import { useState } from 'react';
import SearchFriends from '@/components/SearchFriends';

const FriendsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfile =
    searchTerm.length >= 3
      ? ProfileData.filter((profile) =>
          profile.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  return (
    <div>
      <div className="friends-page">
        <div className="friends-container">
          <div className="friends-head">
            <h1>Search for Friends</h1>

            <div className="friends-search">
              <SearchFriends
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
          </div>
          <div className="friends-body">
            <h2>Current Friends</h2>
            <FriendsCard ProfileData={ProfileData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;

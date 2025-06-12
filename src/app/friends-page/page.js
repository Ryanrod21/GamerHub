'use client';

import ProfileData from '@/data/ProfileData';

import './friends-page.css';
import FriendsCard from '@/components/FriendsCard';
import { useState } from 'react';
import SearchFriends from '@/components/SearchFriends';

const FriendsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <div className="friends-page">
        <div className="friends-list-container">
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
            <FriendsCard ProfileData={ProfileData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;

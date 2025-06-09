'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { addFriend } from '@/utils/friendUtils';
import '../app/App.css';
import { useAuth } from '@/context/authContext';

function SearchFriends() {
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [successMessage, setSeccussMessage] = useState('');

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      // const term = searchTerm.toLocaleLowerCase();
      const term = searchTerm;

      const usersRef = collection(db, 'users');
      const q = query(
        usersRef,
        where('username', '>=', term),
        where('username', '<=', term + '\uf8ff')
      );
      const querySnapshot = await getDocs(q);

      const foundUsers = [];
      querySnapshot.forEach((doc) => {
        foundUsers.push({ id: doc.id, ...doc.data() });
      });

      setResults(foundUsers);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <div className="search-friends-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>Search</button>
        <FontAwesomeIcon
          className="searchbar-mag"
          icon={faMagnifyingGlass}
          size="lg"
          onClick={handleSearch}
        />
      </div>

      {/* Display search results */}
      <div className="search-results">
        {results.length === 0 ? (
          <div className="profile-search-list">
            <h1>No profiles found...</h1>
          </div>
        ) : (
          results.map((userFound) => (
            <div key={userFound.id} className="search-result-item">
              <img
                src={userFound.profilePic || '/acctdefault.jpg'}
                alt="User"
                className="result-img"
              />
              <p>{userFound.username}</p>
              {user?.uid !== userFound.id && (
                <button
                  onClick={async () => {
                    await addFriend(
                      user?.uid,
                      userFound?.id,
                      userFound?.username
                    ); // ✅ correct order
                    // Option 1: Remove from list
                    setResults((prev) =>
                      prev.filter((u) => u.id !== userFound.id)
                    );

                    setSearchTerm('');

                    setSeccussMessage(
                      `Friend request sent to ${userFound.username}`
                    );

                    setTimeout(() => setSeccussMessage(''), 5000);
                  }}
                >
                  Add Friend
                </button>
              )}
            </div>
          ))
        )}
        {successMessage && (
          <div className="successMessage">{successMessage}</div>
        )}
      </div>
    </div>
  );
}
export default SearchFriends;

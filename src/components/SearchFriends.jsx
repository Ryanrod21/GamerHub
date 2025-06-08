import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase'; // Adjust path if needed
import '../app/App.css';

function SearchFriends() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const term = searchTerm.toLocaleLowerCase();
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
        />
        <button onClick={handleSearch}>Search</button>
        <FontAwesomeIcon
          className="searchbar-mag"
          icon={faMagnifyingGlass}
          size="lg"
        />
      </div>
      {/* Display search results */}
      <div className="search-results">
        {results.map((user) => (
          <div key={user.id} className="search-result-item">
            <img
              src={user.profilePic || '/acctdefault.jpg'}
              alt="User"
              className="result-img"
            />
            <p>{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SearchFriends;

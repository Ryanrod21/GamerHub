'use client';

import { useAuth } from '@/context/authContext';
import './account.css';
import { useState } from 'react';

function Account() {
  const { user, userData, userLoggedIn, loading, updateUserData } = useAuth();

  const [username, setUsername] = useState(userData.username);
  const [editing, setEditing] = useState(false);

  // Call an update function (you'd need this in your useAuth hook)
  const handleSave = async () => {
    try {
      await updateUserData({ username }); // Wait for update to complete
      setEditing(false); // Then exit editing mode
    } catch (error) {
      console.error('Failed to update username:', error);
      // Optionally: show a message to the user
    }
  };

  return (
    <div className="account-page">
      <div className="acct-img"></div>

      {editing ? (
        <>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h1>{userData.username}</h1>
          <button onClick={() => setEditing(true)}>Edit Username</button>
        </>
      )}
      <div className="account-info">
        <h3>{userData.firstname}</h3>
        <h3>{userData.email}</h3>
      </div>
    </div>
  );
}

export default Account;

'use client';

import { useAuth } from '@/context/authContext';
import './account.css';
import { useState } from 'react';

function Account() {
  const { user, userData, userLoggedIn, loading, updateUserData } = useAuth();

  const [username, setUsername] = useState(userData.username);
  const [firstname, setFirstname] = useState(userData.firstname);
  const [accountPic, setAccountPic] = useState(userData.accountPic);
  const [email, setEmail] = useState(userData.email);
  const [confirmEmail, setConfirmEmail] = useState('');
  const [editing, setEditing] = useState(false);
  const [editField, setEditField] = useState(null);

  // Call an update function (you'd need this in your useAuth hook)
  const handleSave = async () => {
    try {
      await updateUserData({ username, firstname, email }); // Wait for update to complete
      setEditing(false); // Then exit editing mode
      setEditField(null);
    } catch (error) {
      console.error('Failed to update username:', error);
      // Optionally: show a message to the user
    }
  };

  return (
    <div className="account-page">
      <div className="acct-img">
        <img
          src={userData?.profilePic || '/acctdefault.jpg'}
          alt="Profile Pic"
          className="profile-img"
        />
      </div>

      {/* Username Display (always visible) */}
      <div className="username-display-section">
        <h1>{userData.username}</h1>
      </div>

      {!editing && (
        <button onClick={() => setEditing(true)}>Edit Profile</button>
      )}

      {/* Other Account Info */}
      <div className="account-info">
        <div className="account-details">
          <h1>First Name:</h1>
          <h3>{userData.firstname}</h3>
        </div>
        <div className="account-details">
          <h1>Email: </h1>
          <h3>{userData.email}</h3>
        </div>
      </div>

      {/* Editing Section - placed separately */}
      {editing && !editField && (
        <div>
          <button onClick={() => setEditField('username')}>
            Edit Username
          </button>
          <button onClick={() => setEditField('firstname')}>Edit Name</button>
          <button onClick={() => setEditField('email')}>Edit Email</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      )}

      {editField === 'username' && (
        <div className="edit-section">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Edit username"
          />
          <div className="edit-buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditField(null)}>Cancel</button>
          </div>
        </div>
      )}

      {editField === 'firstname' && (
        <div className="edit-section">
          <input
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Edit Name"
          />
          <div className="edit-buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditField(null)}>Cancel</button>
          </div>
        </div>
      )}

      {editField === 'email' && (
        <div className="edit-section">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="New email"
          />
          <input
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder="Confirm new email"
          />
          <div className="edit-buttons">
            <button
              onClick={handleSave}
              disabled={email !== confirmEmail || email.trim() === ''}
            >
              Save
            </button>
            <button onClick={() => setEditField(null)}>Cancel</button>
          </div>
          {email !== confirmEmail && confirmEmail && (
            <p className="error-message" style={{ color: 'red' }}>
              Emails do not match.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Account;

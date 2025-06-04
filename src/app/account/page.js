'use client';

import { useAuth } from '@/context/authContext';
import './account.css';
import { useEffect, useState } from 'react';

function Account() {
  const { user, userData, userLoggedIn, loading, updateUserData } = useAuth();

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [accountPic, setAccountPic] = useState("");
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
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



  

   
  useEffect(() => {
    if (!userData) return;
    setUsername(userData.username || '');
    setFirstname(userData.firstname || '');
    setAccountPic(userData.accountPic || '');
    setPassword(user?.password || '');
    
  }, [userData, user]);

  // I put this here along with the useEffect to load this until we have the data
  // Putting the userData above in the useState immediately looks for the data when the page loads and doesn't give it time to fetch
  // from firebase and that crashes the app if the data isn't immmdiately avaialable 

    if (loading || !userData) {
    return <div>Loading account info...</div>; 
  }

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
          <button onClick={() => setEditField('password')}>
            Edit Password
          </button>
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

      {editField === 'password' && (
        <div className="edit-section">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
          <div className="edit-buttons">
            <button
              onClick={handleSave}
              disabled={password !== confirmPassword || password.trim() === ''}
            >
              Save
            </button>
            <button onClick={() => setEditField(null)}>Cancel</button>
          </div>
          {password !== confirmPassword && confirmPassword && (
            <p className="error-message" style={{ color: 'red' }}>
              Passwords do not match.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Account;

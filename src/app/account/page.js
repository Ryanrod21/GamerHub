'use client';

import { useAuth } from '@/context/authContext';
import './account.css';
import { useEffect, useState } from 'react';
import { doPasswordChange, doEmailchange } from '@/firebase/auth';
import { useRouter } from 'next/navigation';

function Account() {
  const { user, userData, userLoggedIn, loading, updateUserData } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [accountPic, setAccountPic] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [editing, setEditing] = useState(false);
  const [editField, setEditField] = useState(null);

  useEffect(() => {
    if (!loading && !userLoggedIn) {
      router.push('/login');
    }
  }, [loading, userLoggedIn]);

  useEffect(() => {
    if (userData) {
      setUsername(userData.username || '');
      setFirstname(userData.firstname || '');
      setAccountPic(userData.accountPic || '');
    }

    if (user) {
      setPassword(''); // Don't prefill password for security
    }
  }, [userData, user]);

  const handleSave = async () => {
    try {
      if (editField === 'password') {
        await doPasswordChange(password);
        alert('Password updated successfully!');
        setPassword('');
        setConfirmEmail('');
      } else if (editField === 'email') {
        await doEmailchange(email);
        alert('Password updated successfully!');
      } else {
        await updateUserData({
          username,
          firstname,
          email,
          accountPic,
        });
      }

      setEditing(false);
      setEditField(null);
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update. ' + error.message);
    }
  };

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
        {editing && !editField && (
          <div>
            <button
              className="edit-buttons"
              onClick={() => setEditField('accountPic')}
            >
              Change Profile Picture
            </button>
          </div>
        )}
      </div>

      {/* Username Display (always visible) */}
      <div className="username-display-section">
        <h1>{userData.username}</h1>
        {editing && !editField && (
          <div>
            <button
              className="edit-buttons"
              onClick={() => setEditField('username')}
            >
              Edit Username
            </button>
          </div>
        )}
      </div>

      {/* Other Account Info */}
      <div className="account-info">
        <div className="account-details">
          <h1>First Name:</h1>
          <h3>{userData.firstname}</h3>
          {editing && !editField && (
            <div>
              <button
                className="edit-buttons"
                onClick={() => setEditField('firstname')}
              >
                Edit Name
              </button>
            </div>
          )}
        </div>
        <div className="account-details">
          <h1>Email: </h1>
          <h3>{user.email}</h3>
          {editing && !editField && (
            <div>
              <button
                className="edit-buttons"
                onClick={() => setEditField('email')}
              >
                Edit Email
              </button>
            </div>
          )}
        </div>
      </div>

      <div> </div>

      {!editing && (
        <button className="edit-buttons" onClick={() => setEditing(true)}>
          Edit Profile
        </button>
      )}

      {/* Editing Section - placed separately */}

      {editing && !editField && (
        <div>
          <button
            className="edit-buttons"
            onClick={() => setEditField('password')}
          >
            Edit Password
          </button>
          <button className="edit-buttons" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </div>
      )}

      {editField === 'accountPic' && (
        <div className="edit-section">
          <input
            className="edit-buttons"
            value={accountPic}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Edit username"
          />
          <div>
            <button className="edit-buttons" onClick={handleSave}>
              Save
            </button>
            <button className="edit-buttons" onClick={() => setEditField(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {editField === 'username' && (
        <div className="edit-section">
          <input
            className="edit-buttons"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Edit username"
          />
          <div>
            <button className="edit-buttons" onClick={handleSave}>
              Save
            </button>
            <button className="edit-buttons" onClick={() => setEditField(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {editField === 'firstname' && (
        <div className="edit-section">
          <input
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Edit Name"
            className="edit-buttons"
          />
          <div>
            <button className="edit-buttons" onClick={handleSave}>
              Save
            </button>
            <button className="edit-buttons" onClick={() => setEditField(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {editField === 'email' && (
        <div className="edit-section">
          <div style={{ color: 'white' }}>Current Email: {user.email} </div>
          <input
            type="email"
            className="edit-buttons"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="New email"
          />
          <input
            type="email"
            className="edit-buttons"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder="Confirm new email"
          />
          <div>
            <button
              className="edit-buttons"
              onClick={handleSave}
              disabled={email !== confirmEmail || email.trim() === ''}
            >
              Save
            </button>
            <button className="edit-buttons" onClick={() => setEditField(null)}>
              Cancel
            </button>
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
            className="edit-buttons"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
          />
          <input
            className="edit-buttons"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
          <div>
            <button
              className="edit-buttons"
              onClick={handleSave}
              disabled={password !== confirmPassword || password.trim() === ''}
            >
              Save
            </button>
            <button className="edit-buttons" onClick={() => setEditField(null)}>
              Cancel
            </button>
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

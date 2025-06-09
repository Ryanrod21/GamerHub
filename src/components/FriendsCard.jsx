'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useAuth } from '@/context/authContext';
import { removeFriend } from '@/utils/friendUtils';

function FriendsCard({ onRefresh }) {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [showPopup, setPopup] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!user?.uid) return;

    const fetchFriends = async () => {
      try {
        const friendsRef = collection(db, 'users', user.uid, 'friends');
        const snapshot = await getDocs(friendsRef);

        const friendsList = [];
        snapshot.forEach((doc) => {
          friendsList.push({ id: doc.id, ...doc.data() });
        });

        setFriends(friendsList);
      } catch (err) {
        console.error('Failed to fetch friends:', err);
      }
    };

    fetchFriends();
  }, [user]);

  const togglePopup = () => setPopup(!showPopup);
  const handleInputChange = (e) => setInputValue(e.target.value);

  return (
    <div className="FriendsListCard">
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

      {/* Friends rendering */}
      {friends.length === 0 && <p>No friends added yet.</p>}
      {friends.map((friend) => (
        <div
          className={
            friend.status === 'online'
              ? 'FriendsCardWrapper'
              : 'OfflineCardWrapper'
          }
          key={friend.id}
        >
          <div
            className={
              friend.status === 'online' ? 'FriendsCard' : 'FriendsOfflineCard'
            }
          >
            <img
              className={
                friend.status === 'online' ? 'ProfileImg' : 'ProfileImgOffline'
              }
              src={friend.profilePic || '/acctdefault.jpg'}
              alt={friend.username}
            />
            <span
              className={
                friend.status === 'online'
                  ? 'ProfileHover'
                  : 'ProfileHoverOffline'
              }
            >
              {friend.username}
            </span>

            {/* ✅ Remove button */}
            <button
              onClick={async () => {
                await removeFriend(user.uid, friend.id);
                // Update local state to reflect removal
                setFriends((prev) => prev.filter((f) => f.id !== friend.id));
              }}
              className="remove-friend-btn"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FriendsCard;

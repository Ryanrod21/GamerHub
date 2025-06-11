'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useAuth } from '@/context/authContext';
import { removeFriend } from '@/utils/friendUtils';
import SearchFriends from './SearchFriends';
import Link from 'next/link';
import SendMessageButton from './SendMessage';

function FriendsCard() {
  const { user, userData } = useAuth();
  const [friends, setFriends] = useState([]);
  const [showPopup, setPopup] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchFriends = async () => {
      try {
        // Step 1: Get list of friend IDs
        const friendsRef = collection(db, 'users', user.uid, 'friends');
        const snapshot = await getDocs(friendsRef);

        const friendsList = [];

        // Step 2: For each friend ID, get their full profile
        await Promise.all(
          snapshot.docs.map(async (docSnap) => {
            const friendId = docSnap.id;
            const friendData = docSnap.data();

            const friendProfileRef = doc(db, 'users', friendId);
            const profileSnap = await getDoc(friendProfileRef);

            const fullProfile = profileSnap.exists() ? profileSnap.data() : {};

            friendsList.push({
              id: friendId,
              ...friendData,
              ...fullProfile,
            });
          })
        );

        setFriends(friendsList); // ✅ merged full data in one array
      } catch (err) {
        console.error('Failed to fetch friends:', err);
      }
    };

    fetchFriends();
  }, [user]);

  const togglePopup = () => setPopup(!showPopup);

  return (
    <div className="FriendsListCard">
      <div className="FriendsPanel">
        <div className="OnlinePlus">
          <p>Friends List</p>
          <span className="addBtn" onClick={togglePopup}>
            +
          </span>
        </div>

        {showPopup && <SearchFriends />}
      </div>

      {/* Friends rendering */}
      {friends.length === 0 && <p>No friends added yet.</p>}
      {friends.map((friend) => {
        // console.log('Friend ID:', friend.id);
        // console.log('Pic:', friend.profilePic);
        return (
          <div className="FriendsCardWrapper" key={friend.id}>
            <div className="FriendsCard">
              <Link href={`/account/${friend.id}`} passHref>
                <div className="friend-page-link">
                  <img
                    className="ProfileImg"
                    src={friend.profilePic || '/acctdefault.jpg'}
                    alt={friend.username}
                  />
                  <span className="ProfileHover">{friend.username}</span>
                </div>
              </Link>

              <SendMessageButton toUserId={friend.id} />

              <button
                onClick={async () => {
                  await removeFriend(user.uid, friend.id);
                  setFriends((prev) => prev.filter((f) => f.id !== friend.id));
                }}
                className="remove-friend-btn"
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FriendsCard;

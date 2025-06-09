import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  query,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';

function FriendRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchFriendRequests = async () => {
      try {
        const requestsRef = collection(db, 'users', user.uid, 'friendRequests');
        const q = query(requestsRef);
        const querySnapshot = await getDocs(q);

        const requestsList = [];
        querySnapshot.forEach((doc) => {
          requestsList.push({ id: doc.id, ...doc.data() });
        });

        setRequests(requestsList);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendRequests();
  }, [user]);

  const acceptRequest = async (request) => {
    try {
      // Add both users to each other's friends list
      const currentUserFriendRef = doc(
        db,
        'users',
        user.uid,
        'friends',
        request.userId
      );
      const requesterFriendRef = doc(
        db,
        'users',
        request.userId,
        'friends',
        user.uid
      );

      await setDoc(currentUserFriendRef, {
        userId: request.userId,
        username: request.username,
        addedAt: Date.now(),
      });

      await setDoc(requesterFriendRef, {
        userId: user.uid,
        username: user.displayName || user.email,
        addedAt: Date.now(),
      });

      // Delete the request
      await deleteDoc(doc(db, 'users', user.uid, 'requests', request.userId));

      // Update local state
      setRequests((prev) => prev.filter((r) => r.userId !== request.userId));
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const rejectRequest = async (request) => {
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'requests', request.userId));
      setRequests((prev) => prev.filter((r) => r.userId !== request.userId));
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <div className="friend-requests">
      <h2>Friend Requests</h2>
      {requests.length === 0 ? (
        <p>No friend requests</p>
      ) : (
        requests.map((req) => (
          <div className="request-item notification">
            <img src={req.profilePic} alt="Profile" className="notif-img" />
            <div>
              <p>
                <strong>{req.username}</strong> sent you a friend request
              </p>
              <div className="notif-buttons">
                <button onClick={() => acceptRequest(req)}>Accept</button>
                <button onClick={() => rejectRequest(req)}>Reject</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FriendRequests;

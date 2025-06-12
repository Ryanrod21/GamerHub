import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export const addFriend = async (
  currentUserId,
  targetUserId,
  targetUsername,
  currentUsername,
  currentProfilePic
) => {
  if (!currentUserId || !targetUserId || !targetUsername || !currentUsername) {
    console.error('Missing parameters in addFriend:', {
      currentUserId,
      targetUserId,
      targetUsername,
      currentUsername,
    });
    return;
  }

  try {
    const friendRef = doc(db, 'users', currentUserId, 'friends', targetUserId);
    const docSnap = await getDoc(friendRef);

    if (docSnap.exists()) {
      console.log('Already friends');
      return;
    }

    // Create friend request for the target user
    const requestRef = doc(
      db,
      'users',
      targetUserId,
      'friendRequests',
      currentUserId
    );
    await setDoc(requestRef, {
      fromUserId: currentUserId,
      fromUsername: currentUsername,
      profilePic: currentProfilePic || null,
      sentAt: Date.now(),
      status: 'pending',
    });

    console.log('Friend request sent!');
  } catch (error) {
    console.error('Error sending friend request:', error);
  }
};

export const removeFriend = async (currentUserId, friendId) => {
  try {
    // Remove friend from current user's list
    const myFriendRef = doc(db, 'users', currentUserId, 'friends', friendId);
    await deleteDoc(myFriendRef);

    // Remove current user from friend's list
    const theirFriendRef = doc(db, 'users', friendId, 'friends', currentUserId);
    await deleteDoc(theirFriendRef);

    console.log('Friendship removed from both users');
  } catch (error) {
    console.error('Error removing friend:', error);
  }
};

export const fetchCurrentUsername = async (uid) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data().username;
  } else {
    console.warn('User document not found for UID:', uid);
    return null;
  }
};

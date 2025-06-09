import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export const addFriend = async (
  currentUserId,
  targetUserId,
  targetUsername
) => {
  if (!currentUserId || !targetUserId || !targetUsername) {
    console.error('Missing parameters in addFriend:', {
      currentUserId,
      targetUserId,
      targetUsername,
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

    await setDoc(friendRef, {
      userId: targetUserId,
      username: targetUsername,
      addedAt: Date.now(),
    });

    console.log('Friend added!');
  } catch (error) {
    console.error('Error adding friend:', error);
  }
};

export const removeFriend = async (currentUserId, friendId) => {
  try {
    const friendRef = doc(db, 'users', currentUserId, 'friends', friendId);
    await deleteDoc(friendRef);
    console.log('Friend removed');
  } catch (error) {
    console.error('Error removing friend:', error);
  }
};

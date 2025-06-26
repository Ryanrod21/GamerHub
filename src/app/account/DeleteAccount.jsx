import React from 'react';
import { deleteUser } from 'firebase/auth';
import { auth, db } from '@/firebase/firebase';
import {
  collection,
  getDocs,
  updateDoc,
  arrayRemove,
  doc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';

const cleanupFriendsSubcollections = async (deletedUserId) => {
  const usersRef = collection(db, 'users');
  const allUsersSnapshot = await getDocs(usersRef);

  const deletions = [];

  allUsersSnapshot.forEach((userDoc) => {
    const friendDocRef = doc(db, 'users', userDoc.id, 'friends', deletedUserId);
    deletions.push(
      deleteDoc(friendDocRef).catch(() => {
        // Ignore if document doesn't exist
      })
    );
  });

  await Promise.all(deletions);
  console.log('Removed user from all friends subcollections.');
};

const DeleteAccountButton = () => {
  const handleDelete = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert('No user is currently signed in.');
      return;
    }

    const confirm = window.confirm(
      'Are you sure you want to delete your account? This cannot be undone.'
    );
    if (!confirm) return;

    try {
      const deletedUserId = user.uid;

      // Clean up friends subcollections
      await cleanupFriendsSubcollections(deletedUserId);

      // Delete user doc
      await deleteDoc(doc(db, 'users', deletedUserId));

      // Delete auth user
      await deleteUser(user);

      alert('Account deleted successfully.');
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        alert('Please log in again before deleting your account.');
      } else {
        alert('Error deleting account: ' + error.message);
      }
    }
  };

  return (
    <button onClick={handleDelete} className="delete-acct-btn">
      Delete My Account
    </button>
  );
};

export default DeleteAccountButton;

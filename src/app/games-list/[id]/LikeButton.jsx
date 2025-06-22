'use client';

import { useState, useEffect } from 'react';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '@/firebase/firebase';

export default function GameLikeButton({ gameId }) {
  const [likes, setLikes] = useState([]);
  const [user, setUser] = useState(null);

  // ✅ Watch for logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Fetch likes from Firestore
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const ref = doc(db, 'games', gameId);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setLikes([]);
          return;
        }

        if (user) {
          console.log('Firebase Auth user object:', user);
        }

        const data = snap.data();
        // Defensive: make sure likes is an array
        const likesArray = Array.isArray(data.likes) ? data.likes : [];

        setLikes(likesArray);
      } catch (err) {
        console.error('Error fetching likes:', err);
        setLikes([]); // fallback
      }
    };

    fetchLikes();
  }, [gameId, user]);

  // ✅ Handle Like/Unlike
  const handleLike = async () => {
    if (!user) return alert('Please log in');

    const username = user.displayName || user.email || user.uid;
    const ref = doc(db, 'games', gameId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      // Create doc with initial likes array
      await setDoc(ref, { likes: [username] });
      setLikes([username]);
      return;
    }

    const likesArray = snap.data().likes || [];
    const alreadyLiked = likesArray.includes(username);

    if (alreadyLiked) {
      await updateDoc(ref, { likes: arrayRemove(username) });
      setLikes((prev) => prev.filter((name) => name !== username));
    } else {
      await updateDoc(ref, { likes: arrayUnion(username) });
      setLikes((prev) => [...prev, username]);
    }
  };

  if (!user) return <p>Please log in to like this game</p>;

  const username = user.username || user.email || user.uid;

  return (
    <div>
      <button onClick={handleLike}>
        {Array.isArray(likes) && likes.includes(username) ? 'Unlike' : 'Like'}
      </button>
      <p>Liked by: {likes.length ? likes.join(', ') : 'No likes yet'}</p>
    </div>
  );
}

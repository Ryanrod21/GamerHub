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
  const [username, setUsername] = useState('');

  // ✅ Watch auth and fetch username from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            setUsername(data.username || firebaseUser.email); // fallback to email
          } else {
            setUsername(firebaseUser.email);
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setUsername(firebaseUser.email); // fallback
        }
      } else {
        setUsername('');
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Fetch likes for the game
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const ref = doc(db, 'games', gameId);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setLikes([]);
          return;
        }

        const data = snap.data();
        const likesArray = Array.isArray(data.likes) ? data.likes : [];
        setLikes(likesArray);
      } catch (err) {
        console.error('Error fetching likes:', err);
        setLikes([]);
      }
    };

    fetchLikes();
  }, [gameId]);

  // ✅ Handle Like/Unlike
  const handleLike = async () => {
    if (!user) return alert('Please log in');
    if (!username) return;

    const ref = doc(db, 'games', gameId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
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

  return (
    <div>
      <button onClick={handleLike}>
        {likes.includes(username) ? 'Unlike' : 'Like'}
      </button>
      <p>Liked by: {likes.length ? likes.join(', ') : 'No likes yet'}</p>
    </div>
  );
}

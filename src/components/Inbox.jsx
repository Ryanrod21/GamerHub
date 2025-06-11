'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useAuth } from '@/context/authContext';

export default function Inbox() {
  const { user } = useAuth(); // current user
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, 'messages'),
      where('to', '==', user.uid), // messages *sent to* this user
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log('msg rec', msgs);
      setMessages(msgs);
    });

    return () => unsubscribe(); // clean up listener on unmount
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'messages', id));
      // Optimistically update UI:
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  return (
    <div>
      <h2>Inbox</h2>
      {messages.length === 0 && <p>No messages yet.</p>}
      <ul>
        {messages.map((msg) => (
          <li key={msg.id} style={{ marginBottom: '1rem' }}>
            <strong>From:</strong> {msg.from?.username || 'Unknown user'}
            <br />
            <strong>Message:</strong> {msg.message}
            <br />
            <button
              onClick={() => handleDelete(msg.id)}
              style={{ marginTop: '0.5rem' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

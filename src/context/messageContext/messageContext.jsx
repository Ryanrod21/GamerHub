'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useAuth } from '../authContext';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, 'messages'),
      where('to', '==', user.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const unread = messages.filter((msg) => !msg.isRead).length;
      setUnreadCount(unread);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <MessageContext.Provider value={{ unreadCount }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);

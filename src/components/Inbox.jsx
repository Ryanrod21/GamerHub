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
import SendMessageButton from './SendMessage';

export default function Inbox() {
  const { user } = useAuth(); // current user
  const [messages, setMessages] = useState([]);
  const [replyToId, setReplyToId] = useState(null); // track which message is replying
  const [unreadCount, setUnreadCount] = useState(0);

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
    <div className="inbox-wrapper">
      <h2 className="inbox-title">Inbox</h2>
      <div className="inbox-list-container">
        {messages.length === 0 ? (
          <p className="no-messages">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="message-card">
              <p className="message-from">
                <strong>From:</strong> {msg.from?.username || 'Unknown user'}
              </p>
              <p className="message-content">
                <strong>Message:</strong> {msg.message}
              </p>
              <div className="message-actions">
                {replyToId !== msg.id && (
                  <>
                    <button
                      className="btn-reply"
                      onClick={() =>
                        setReplyToId(replyToId === msg.id ? null : msg.id)
                      }
                    >
                      Reply
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(msg.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
              {replyToId === msg.id && (
                <SendMessageButton
                  toUserId={msg.from?.uid}
                  autoOpen
                  onCancel={() => setReplyToId(null)}
                  onSendComplete={() => setReplyToId(null)}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

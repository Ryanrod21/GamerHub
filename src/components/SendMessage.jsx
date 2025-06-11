'use client';

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useAuth } from '@/context/authContext';

export default function SendMessageButton({ toUserId }) {
  const [showInput, setShowInput] = useState(false);
  const [message, setMessage] = useState('');

  const { userData, user } = useAuth(); // assuming userData has username

  const handleSend = async () => {
    if (!message.trim()) {
      console.log('Message empty');
      return;
    }

    if (!userData?.username) {
      console.error('No username available!');
      return; // stops if username missing
    }

    try {
      await addDoc(collection(db, 'messages'), {
        from: {
          uid: user.uid,
          username: userData.username, // get username from your context here
        },
        to: toUserId,
        message,
        timestamp: new Date(),
      });
      setMessage('');
      setShowInput(false);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    console.log('messg', e.target.value);
  };

  return (
    <div className="send-message-wrapper">
      <button
        className="message-friend-btn"
        onClick={() => setShowInput(!showInput)}
      >
        {showInput ? 'Cancel' : 'Send Message'}
      </button>

      {showInput && (
        <div className="message-popup">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={handleChange}
            className="message-input"
          />
          <button onClick={handleSend} className="send-btn">
            Send
          </button>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useAuth } from '@/context/authContext';
import '../app/App.css';

export default function SendMessageButton({
  toUserId,
  autoOpen = false,
  onCancel,
  onSendComplete,
}) {
  const [showInput, setShowInput] = useState(autoOpen);
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
          profilePic: userData.profilePic,
        },
        to: toUserId,
        message,
        timestamp: new Date(),
      });
      setMessage('');
      setShowInput(false);

      if (onSendComplete) onSendComplete();
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    console.log('messg', e.target.value);
  };

  const handleCancel = () => {
    setShowInput(false);
    if (onCancel) onCancel();
  };

  return (
    <div className="send-message-wrapper">
      {!showInput && (
        <button
          className="message-friend-btn"
          onClick={() => setShowInput(!showInput)}
          style={{ display: showInput ? 'none' : 'inline-block' }} // hide when input open
        >
          {showInput ? 'Cancel' : 'Send Message'}
        </button>
      )}

      {showInput && (
        <div className="message-popup">
          <textarea
            placeholder="Type your message..."
            value={message}
            onChange={handleChange}
            className="message-input"
          />

          <button onClick={handleSend} className="send-btn">
            Send
          </button>

          <button onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

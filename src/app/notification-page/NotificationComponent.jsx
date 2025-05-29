'use client';

import { useState } from 'react';
import NotficationData from '../../data/NotificationData';
import './notification.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '@/context/authContext';

export default function NotficationComponent() {
  const { user, userLoggedIn, loading } = useAuth();

  const [notifications, setNotifications] = useState(NotficationData);

  console.log(NotficationData);

  const removeNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div>
      <div className="notificationLogout">
        <h1>Login to receieve message from other users and news !</h1>
        <p className="login-btn">
          <a href="/login">Login</a>
        </p>
      </div>

      {userLoggedIn && (
        <div className="message-hero">
          <div className="notification-head">
            <h1 className="notification-text">Notifications</h1>
            {notifications.length > 0 && (
              <button onClick={clearAll} className="clear-all-btn">
                Clear All
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="no-notification-text">
              <h1>No notifications</h1>
            </div>
          ) : (
            <div className="message-container">
              {notifications.map((notif) => (
                <div key={notif.id} className="message-body ">
                  <div className="message-recieved-container">
                    <div className="message-receieved-body">
                      <h2>{notif.title}</h2>
                      <p>{notif.message}</p>
                      <span>{notif.time}</span>
                    </div>
                    <button
                      onClick={() => removeNotification(notif.id)}
                      className="dismiss-btn"
                      title="Dismiss"
                    >
                      <FontAwesomeIcon icon={faTrashCan} size="lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';

import '../app/App.css';
import FriendsList from './FriendsList';
import Logout from '../components/Logout';

import NotificationData from '../data/NotificationData';

function SideHero({ ProfileData, notificationCount }) {
  return (
    <div className="SideHero">
      <p>
        <a href="/">My Dashboard</a>
      </p>
      <p>
        <a href="/games-list">Game's List</a>
      </p>
      <p>
        <a href="/friends-page">Friends</a>
      </p>
      <p>
        <a href="/notification-page">
          Notification
          {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
          )}
        </a>
      </p>

      <FriendsList ProfileData={ProfileData} />

      <Logout />
    </div>
  );
}

export default SideHero;

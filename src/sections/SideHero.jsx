'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import '../app/App.css';
import FriendsList from './FriendsList';
import Logout from '../components/Logout';

import NotificationData from '../data/NotificationData';

function SideHero({ ProfileData, notificationCount }) {

  const pathname = usePathname()

  return (
    <div className="SideHero">
      <p className={pathname == '/' ? "active" : ""}>
        <a href="/">My Dashboard</a>
      </p>
      <p className={pathname == '/games-list' ? "active" : ""}>
        <a href="/games-list">Game's List</a>
      </p>
      <p className={pathname == '/friends-page' ? "active" : ""}>
        <a href="/friends-page">Friends</a>
      </p>
      <p className={pathname == '/notification-page' ? "active" : ""}>
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

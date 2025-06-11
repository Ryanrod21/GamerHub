'use client';

import { useState } from 'react';
import SideHero from '@/sections/SideHero';
import NotificationComponent from './NotificationComponent';
import NotificationData from '../../data/NotificationData';
import Navbar from '@/sections/NavBar';

import './notification.css';

import ProfileData from '@/data/ProfileData';
import FriendRequests from '@/components/FriendRequests';

function NotificationPage({ notification, removeNotification, clearAll }) {
  return (
    <div className="notification-page">
      <div className="notification-container">
        <FriendRequests />

        {/* <NotificationComponent
          notification={notification}
          removeNotification={removeNotification}
          clearAll={clearAll}
        /> */}
      </div>
    </div>
  );
}

export default NotificationPage;

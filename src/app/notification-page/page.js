'use client';

import './notification.css';
import Inbox from '@/components/Inbox';

function NotificationPage() {
  return (
    <div className="notification-page">
      <h1>Notification</h1>
      <div className="notification-container">
        <Inbox />
      </div>
    </div>
  );
}

export default NotificationPage;

'use client';

import { useState } from 'react';
import NotificationData from '../../data/NotificationData';
import SideHero from '../../components/SideHero';

function NotificationLayout({ children }) {
  const [notifications, setNotifications] = useState(NotificationData);

  const removeNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="dashboard-layout">
      <SideHero notificationCount={notifications.length} />
      <main className="main-content">
        {React.cloneElement(children, {
          notifications,
          removeNotification,
          clearAll,
        })}
      </main>
    </div>
  );
}

export default NotificationLayout;

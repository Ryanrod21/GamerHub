import SideHero from '@/sections/SideHero';
import NotificationComponent from './NotificationComponent';
import Navbar from '@/sections/NavBar';

import './notification.css';

import ProfileData from '@/data/ProfileData';

function NotificationPage() {
  return (
    <div className="notification-page">
      <SideHero ProfileData={ProfileData} />
      <div className="notification-container">
        <Navbar />
        <NotificationComponent />
      </div>
    </div>
  );
}

export default NotificationPage;

'use client';

import { usePathname } from 'next/navigation';
import '../app/App.css';
import Logout from '../components/Logout';
import { useAuth } from '@/context/authContext';
import FriendsCard from '@/components/FriendsCard';
import { useMessages } from '@/context/messageContext/messageContext';
import { useFriendRequestsCount } from '@/components/FriendCount';

function SideHero() {
  const { user, userLoggedIn, loading } = useAuth();

  const { unreadCount } = useMessages();

  const friendRequestsCount = useFriendRequestsCount();

  const pathname = usePathname();

  return (
    <div className={`SideHero ${userLoggedIn ? '' : 'loggedOut'}`}>
      <div className={pathname == '/' ? 'active' : ''}>
        <a href="/">My Dashboard</a>
      </div>
      <div className={pathname == '/games-list' ? 'active' : ''}>
        <a href="/games-list">Game's List</a>
      </div>
      {userLoggedIn && (
        <div className={pathname == '/friends-page' ? 'active' : ''}>
          <a href="/friends-page">Friends</a>
        </div>
      )}
      {userLoggedIn && (
        <div className={pathname == '/friend-request' ? 'active' : ''}>
          <div className="friend-and-badge">
            <a href="/friend-request">
              Friend Requests
              {friendRequestsCount > 0 && (
                <span className="notification-badge">
                  {friendRequestsCount}
                </span>
              )}
            </a>
          </div>
        </div>
      )}
      <div className={pathname == '/notification-page' ? 'active' : ''}>
        <div className="notify-and-badge">
          <a href="/notification-page">
            Notification
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </a>
        </div>
      </div>

      {userLoggedIn && (
        <>
          <FriendsCard />
          <Logout />
        </>
      )}
    </div>
  );
}

export default SideHero;

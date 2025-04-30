import '../app/App.css';
import FriendsList from './FriendsList';
import Logout from '../components/Logout';

function SideHero({ ProfileData }) {
  return (
    <div className="SideHero">
      <p>
        <a href="#">My Dashboard</a>
      </p>
      <p>
        <a href="/games-list">Game's List</a>
      </p>
      <p>
        <a href="/friends-page">Friends</a>
      </p>
      <p>
        <a href="#">Notification</a>
      </p>

      <FriendsList ProfileData={ProfileData} />

      <Logout />
    </div>
  );
}

export default SideHero;

import { List } from 'lucide-react';
import { FaCircle } from 'react-icons/fa';

const ProfileList = ({ profiles }) => {
  const StatusIcon = ({ color = 'green' }) => (
    <FaCircle color={color} size={12} />
  );

  if (profiles.length === 0) {
    return (
      <div className="profile-search-list">
        <h1>No profiles found...</h1>
      </div>
    );
  }

  const profileCards = profiles.map((profile) => {
    return (
      <li className="profileCard" key={profile.id}>
        <img src={profile.img} />
        <div className="profile-info">
          <h2>{profile.name}</h2>
          <div className="profileDescription">
            <p>{profile.description}</p>
            <p className="status">
              Status: {profile.status}
              <StatusIcon
                style={{
                  color: profile.status === 'online' ? 'green' : 'red',
                }}
              />
            </p>
          </div>
        </div>
        <ul>
          {profile.games?.map((game, index) => {
            return (
              <li key={index}>
                {game.title}: {game.hoursPlayed}
              </li>
            );
          })}
        </ul>
      </li>
    );
  });
  return <ul className="test">{profileCards}</ul>;
};

export default ProfileList;

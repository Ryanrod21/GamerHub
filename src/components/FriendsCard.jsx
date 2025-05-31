'use client';

import '../app/App.css';
import { FaCircle } from 'react-icons/fa';
import ProfileData from '@/data/ProfileData';

function FriendsCard({ ProfileData }) {
  const StatusIcon = ({ color = 'green' }) => (
    <FaCircle color={color} size={12} />
  );

  //   Usage
  //   <StatusIcon color="green" />
  //   <StatusIcon color="red" />

  const RenderedFriendsOnline = [...ProfileData]
    .sort((a, b) => {
      // Put 'online' users before anything else
      if (a.status === 'online' && b.status !== 'online') return -1;
      if (a.status !== 'online' && b.status === 'online') return 1;

      if (a.isFriend && !b.isFriend) return -1;
      if (!a.isFriend && b.isFriend) return 1;
      return 0;
    })
    .map((profile) => {
      if (profile.status === 'online' && profile.isFriend) {
        return (
          <div className="FriendsCardWrapper" key={profile.id}>
            <div className="FriendsCard">
              <img className="ProfileImg" src={profile.img} />
              <span className="ProfileHover">{profile.name} </span>
              <div className="Profile-popup">
                {profile.description}

                <ul>
                  {profile.games?.map((game, index) => {
                    return (
                      <li key={index}>
                        {game.title}: {game.hoursPlayed}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <StatusIcon color="green" />
            </div>
          </div>
        );
      } else if (profile.status !== 'online' && profile.isFriend) {
        return (
          <div className="OfflineCardWrapper" key={profile.id}>
            <div className="FriendsOfflineCard">
              <img className="ProfileImgOffline" src={profile.img} />
              <span className="ProfileHoverOffline">{profile.name} </span>
              <div className="Profile-popupOffline">{profile.offline}</div>
              <StatusIcon color="red" />
            </div>
          </div>
        );
      }
    });

  const RenderedRecommendFriends = [...ProfileData]
    .slice(0, 4)
    .map((profile) => {
      if (!profile.isFriend) {
        return (
          <div className="OfflineCardWrapper" key={profile.id}>
            <div className="FriendsOfflineCard">
              <img className="ProfileImgOffline" src={profile.img} />
              <span className="ProfileHoverOffline">{profile.name} </span>
              <div className="Profile-popupOffline">{profile.offline}</div>
            </div>
          </div>
        );
      }
      // return null; // Ensure the function always returns something (or null if not rendering anything)
    });
  return (
    <div className="FriendsListCard">
      {RenderedFriendsOnline}
      <p>Recommend:</p>
      {RenderedRecommendFriends}
    </div>
  );
}

export default FriendsCard;

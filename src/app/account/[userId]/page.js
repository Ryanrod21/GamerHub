'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import '../account.css';

export default function UserProfile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setUserData(null);
      }
    };
    fetchUserData();
  }, [userId]);

  if (userData === null) return <div>User not found or access denied.</div>;

  return (
    <div className="account-page">
      <div className="acct-img">
        <img
          src={userData?.profilePic || '/acctdefault.jpg'}
          alt="Profile Pic"
          className="profile-img"
        />
      </div>

      <div className="username-display-section">
        <h1>{userData.username}</h1>
      </div>

      <div className="account-info">
        <div className="account-details">
          <h1>First Name:</h1>
          <h3>{userData.firstname}</h3>
        </div>
      </div>
    </div>
  );
}

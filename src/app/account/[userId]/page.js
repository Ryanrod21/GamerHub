import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import '../account.css';

export default async function UserProfile({ params }) {
  const { userId } = params;

  const userRef = doc(db, 'users', userId);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    return <div>User not found.</div>;
  }

  const userData = docSnap.data();

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

      {/* Other Account Info */}
      <div className="account-info">
        <div className="account-details">
          <h1>First Name:</h1>
          <h3>{userData.firstname}</h3>
        </div>
      </div>
    </div>
  );
}

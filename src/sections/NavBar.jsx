'use client';
import '../app/navbar.css';
import Dropdown from '../components/NavDropdown';
import SearchBar from '../components/SearchBar';
import { useAuth } from '@/context/authContext';
import { auth } from '@/firebase/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { user, userData, userLoggedIn, loading } = useAuth();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo-search-bar">
        <h2 className="Logo">TheGameHub</h2>
        {/* <img src="/GHload.png" style={{ width: '100px', height: '100px' }} /> */}
        <SearchBar />
      </div>
      <div className="nav-link-dropdown">
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about-page">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          {userLoggedIn && userData ? (
            <>
              <li className="account-username" style={{ fontWeight: '700' }}>
                <img
                  src={userData?.profilePic || '/acctdefault.jpg'}
                  alt="Profile Pic"
                  className="navbar-profile-img"
                />
                <a href="/account">{userData.username}</a>
                <ul className="account-username-dropdown">
                  <li>
                    <a href="/account">Account</a>
                  </li>
                  <li onClick={handleLogout} className="logout-nav">
                    Sign Out
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <li>
              <a href="/login">Login</a>
            </li>
          )}
        </ul>
        <Dropdown />
      </div>
    </nav>
  );
};

export default Navbar;

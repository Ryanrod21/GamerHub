import '../app/navbar.css';
import Dropdown from '../components/NavDropdown';
import SearchBar from '../components/SearchBar';
import { useAuth } from '@/context/authContext';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { user, userData, userLoggedIn, loading } = useAuth();

  const pathname = usePathname();

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
        <h2 className="Logo">TheGamerHub</h2>
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
          {userLoggedIn ? (
            <li className="account-username" style={{ fontWeight: '700' }}>
              <a href="/account">{userData.username}</a>
              <ul className="account-username-dropdown">
                <li>
                  <a href="/account">Account</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Sign Out</a>
                </li>
              </ul>
            </li>
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

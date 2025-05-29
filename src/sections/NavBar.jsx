import '../app/navbar.css';
import Dropdown from '../components/NavDropdown';
import SearchBar from '../components/SearchBar';
import { useAuth } from '@/context/authContext';

const Navbar = () => {
  const { user, userLoggedIn, loading } = useAuth();

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
            <li style={{ fontWeight: '700' }}>{user.email}</li>
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

import '../app/navbar.css';
import Dropdown from '../components/NavDropdown';
import SearchBar from '../components/SearchBar';

const Navbar = () => {
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
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
        <Dropdown />
      </div>
    </nav>
  );
};

export default Navbar;

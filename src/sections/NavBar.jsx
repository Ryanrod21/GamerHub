import '../app/navbar.css';
import Dropdown from '../components/NavDropdown';
import SearchBar from '../components/SearchBar';

const Navbar = () => {
  // const styles = {
  //   nav: {
  //     display: 'flex',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //     padding: '0 25px',
  //     background: '#333',
  //     color: '#fff',
  //     width: '97%',
  //     borderRadius: '30px',
  //   },
  //   logo: {
  //     margin: 0,
  //   },
  //   navLinks: {
  //     listStyle: 'none',
  //     display: 'flex',
  //     gap: '16px',
  //   },
  // linkTheme: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   gap: '60px',
  // },
  // };

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
            <a href="#">Login</a>
          </li>
        </ul>
        <Dropdown />
      </div>
    </nav>
  );
};

export default Navbar;

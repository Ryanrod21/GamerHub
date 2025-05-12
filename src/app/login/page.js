import './login.css';

function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>The Gamer Hub</h1>
        <h1>Login</h1>
        <form className="login-form">
          <label htmlFor="username">Username or Email</label>
          <input id="username" type="text" placeholder="Username or Email" />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Password" />

          <button type="submit">Log In</button>

          <div className="newuser-div">
            <a href="#">New User? Sign up</a>
          </div>

          <button type="button" className="back-home-button">
            <a href="/">← Back to Home</a>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

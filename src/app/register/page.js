import './register.css';

function Register() {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>The Gamer Hub</h1>
        <h1>Register</h1>
        <form className="login-form">
          <label htmlFor="username">Username</label>
          <input id="username" type="text" placeholder="Username " />

          <label htmlFor="username">First Name</label>
          <input id="username" type="text" placeholder="First Name" />

          <label htmlFor="username">Last Name</label>
          <input id="username" type="text" placeholder="Last Name" />

          <label htmlFor="username">Email</label>
          <input id="username" type="text" placeholder="Email" />

          <label htmlFor="password">Create Password</label>
          <input id="password" type="password" placeholder="Password" />

          <label htmlFor="password">Confirm Password</label>
          <input id="password" type="password" placeholder="Password" />

          <button type="submit">Create Account</button>

          <button type="button" className="back-home-button">
            <a href="/login">← Sign In</a>
          </button>

          <button type="button" className="back-home-button">
            <a href="/">← Back to Home</a>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

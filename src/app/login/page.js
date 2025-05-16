'use client';

import './login.css';

// import { auth } from '../firebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  // signInWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     console.log('Logged in:', userCredential.user);
  //   })
  //   .catch((error) => {
  //     console.error('Error logging in:', error);
  //   });

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
          <div className="forgotpassword-div">
            <a href="/register">Forgot Password ?</a>
          </div>

          <button type="submit" className="login-button">
            Log In
          </button>

          <div className="newuser-div">
            <a href="/register">New User? Sign up</a>
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

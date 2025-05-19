'use client';

import { useState } from 'react';
import { doSignInUserWithEmailAndPassword } from '@/firebase/auth';
import { useAuth } from '@/context/authContext';
import './login.css';

function Login() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState('false');
  const [errorMessage, setErrorMessage] = useState('');

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

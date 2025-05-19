'use client';

import { useState } from 'react';
import { doSignInUserWithEmailAndPassword } from '@/firebase/auth';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import './login.css';

function Login() {
  const router = useRouter();
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    setErrorMessage('');

    try {
      await doSignInUserWithEmailAndPassword(email, password);
      router.push('/'); 
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  if (userLoggedIn) {
    router.push('/'); // Already logged in
    return null;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>The Gamer Hub</h1>
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="forgotpassword-div">
            <a href="/reset">Forgot Password?</a>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="login-button" disabled={isSigningIn}>
            {isSigningIn ? 'Logging in...' : 'Log In'}
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

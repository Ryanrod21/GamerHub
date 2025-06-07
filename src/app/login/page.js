'use client';

import { useState, useEffect, useRef } from 'react';
import { doSignInUserWithEmailAndPassword } from '@/firebase/auth';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase';

import './login.css';

function Login() {
  const router = useRouter();
  const { userLoggedIn } = useAuth();

  const loginIdRef = useRef();
  const passwordRef = useRef();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    setErrorMessage('');

    const loginId = loginIdRef.current.value;
    const password = passwordRef.current.value;

    try {
      let emailToUse = loginId;

      // If it's not an email, look up username
      if (!loginId.includes('@')) {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', loginId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setErrorMessage('Username not found');
          console.log('username', loginId);
          return;
        }

        emailToUse = querySnapshot.docs[0].data().email;

        if (!emailToUse.includes('@')) {
          setErrorMessage('Could not resolve username to valid email');
          return;
        }
      }

      await doSignInUserWithEmailAndPassword(auth, emailToUse, password);
      router.push('/');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  useEffect(() => {
    if (userLoggedIn === true) {
      router.push('/');
    }
  }, [userLoggedIn, router]);

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>The Gamer Hub</h1>
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Username/Email</label>
          <input id="email" type="text" placeholder="Email" ref={loginIdRef} />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            ref={passwordRef}
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

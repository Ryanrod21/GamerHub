'use client';

import './register.css';
import { useRef, useState } from 'react';
import { doCreateUserWithEmailAndPassword } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import {
  doc,
  getDocs,
  setDoc,
  query,
  where,
  collection,
} from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase';

function Register() {
  const usernameRef = useRef();
  const firstRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const username = usernameRef.current.value.trim();
    const firstname = firstRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (username.length > 20) {
      setError('Username cannot be more than 20 characters');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsCreating(true);
    try {
      console.log('Creating user...');
      const userCredential = await doCreateUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      console.log('User created:', user.uid);
      console.log('auth.currentUser:', auth.currentUser?.uid);

      const userDocRef = doc(db, 'users', user.uid);
      console.log('Writing to Firestore:', userDocRef.path);

      await setDoc(userDocRef, {
        username,
        username_lowercase: username.toLowerCase(),
        firstname,
        email: user.email,
        profilePic: '/acctdefault.jpg',
      });

      console.log('User doc created!');
      router.push('/');
    } catch (err) {
      console.error('❌ Error code:', err.code);
      console.error('❌ Error message:', err.message);
      setError(`${err.code}: ${err.message}`);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>The Gamer Hub</h1>
        <h1>Register</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            ref={usernameRef}
            maxLength={20}
          />

          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            ref={firstRef}
          />

          <label htmlFor="email">Email</label>
          <input id="email" type="text" placeholder="Email" ref={emailRef} />

          <label htmlFor="password">Create Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={isCreating}>
            {isCreating ? 'Creating...' : 'Create Account'}
          </button>

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

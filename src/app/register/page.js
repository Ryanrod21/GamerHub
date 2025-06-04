'use client';

import './register.css';
import { useRef, useState } from 'react';
import { doCreateUserWithEmailAndPassword } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

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

    const username = usernameRef.current.value;
    const firstname = firstRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsCreating(true);
    try {
      const userCredential = await doCreateUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        username,
        firstname,
        email: user.email,
        profilePic: '/acctdefault.jpg',
      });

      console.log('user saved!');

      router.push('/');
    } catch (err) {
      console.error('Firestore Error ', err);
      setError(err.message);
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

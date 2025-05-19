'use client';
import './register.css';
import { useRef } from 'react';

function Register() {
  const usernameRef = useRef();
  const firstRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert('Password do not match');
      return;
    }

    const data = {
      username: usernameRef.current.value,
      first: firstRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log(data);
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
            placeholder="Username "
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

          <label htmlFor="password">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Password"
            ref={confirmPasswordRef}
          />

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

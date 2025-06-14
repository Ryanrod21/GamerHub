'use client';

import './about.css';
import { useEffect } from 'react';

const AboutPage = () => {
  useEffect(() => {
    document.body.style.background = 'grey';
    document.body.style.margin = '0';
  }, []);

  return (
    <>
      <div className="about-us-container">
        <div className="about-us">
          <h1>About Us</h1>
          <p>
            Gamer Hub is a fun and interactive site I'm building for gamers to
            explore and connect. You can look up games, read up on them, check
            out the latest news, and see who’s streaming that game live. Users
            can log in, add friends, chat, and even start or join communities to
            find people to play with. There’s also built-in music so you can
            listen while browsing—kind of like your own personal gaming lounge.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;

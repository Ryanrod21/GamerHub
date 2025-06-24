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
          <div className="img-p">
            <img src="./kh2.jpg" />
            <p>
              The GamerHub is your ultimate all-in-one gaming dashboard. Search
              for any game and dive into detailed information, including
              descriptions, ratings (E, T, M), screenshots, publishers, and
              supported platforms. Stay connected by liking your favorite
              titles, adding friends, and messaging other gamers directly on the
              site. Whether you're exploring new games or building your gamer
              network, The GamerHub delivers a complete social and discovery
              experience for gamers.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;

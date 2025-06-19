'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getTopGames } from '@/RAWG/rawg'; // adjust path as needed
import '../app/navbar.css';
import '../app/App.css';
import Link from 'next/link';

function ImageSlider() {
  const [currentImage, setCurrentImage] = useState(0);
  const [gameNews, setGameNews] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      try {
        const data = await getTopGames();

        setGameNews(data.results);
      } catch (err) {
        console.error('Error fetching top games:', err);
      }
    }

    fetchGames();
  }, []);

  const [ringOffset, setRingOffset] = useState(100);

  const SLIDE_DURATION = 10; // seconds

  useEffect(() => {
    if (gameNews.length === 0) return;

    let animationFrameId;
    let startTime = null;

    const duration = SLIDE_DURATION * 1000; // e.g. 5000ms
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setRingOffset(100 - progress * 100);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // time's up: move to next slide and restart animation
        setCurrentImage((prev) =>
          prev === gameNews.length - 1 ? 0 : prev + 1
        );
        startTime = null; // reset timer
        animationFrameId = requestAnimationFrame(animate); // start again
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [gameNews, currentImage]);

  const goPrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? gameNews.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentImage((prev) => (prev === gameNews.length - 1 ? 0 : prev + 1));
  };

  if (gameNews.length === 0) return <p>Loading top games...</p>;

  const game = gameNews[currentImage];

  return (
    <div className="MainNews-Button">
      <Link href={`/games-list/${game.id}`}>
        <img src={game.background_image} alt={game.name} />
      </Link>
      <div className="MainNews-SlideBtn">
        <h2>{game.name}</h2>
        <p>
          {game.released} | Rating: {game.rating}
        </p>
        <div className="tags">
          {game.tags?.slice(0, 3).map((tag) => (
            <span key={tag.id} className="tag">
              {tag.name}
            </span>
          ))}
        </div>
        <div className="slider-controls">
          <div className="circle-button" onClick={goPrevious}>
            <svg className="progress-ring" viewBox="0 0 36 36">
              <circle className="ring-bg" cx="18" cy="18" r="16" />
              <circle
                className="ring-fill"
                cx="18"
                cy="18"
                r="16"
                style={{ strokeDashoffset: ringOffset }}
              />
            </svg>
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>

          <div className="circle-button" onClick={goNext}>
            <svg className="progress-ring" viewBox="0 0 36 36">
              <circle className="ring-bg" cx="18" cy="18" r="16" />
              <circle
                className="ring-fill"
                cx="18"
                cy="18"
                r="16"
                style={{ strokeDashoffset: ringOffset }}
              />
            </svg>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;

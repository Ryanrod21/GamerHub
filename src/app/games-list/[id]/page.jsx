// app/games/[id]/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getGameDetails, getGameScreenShot } from '@/RAWG/rawg';
import '../games-list.css';

export default function GameDetailPage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screenshot, setScreenshot] = useState(null);

  useEffect(() => {
    async function loadDetails() {
      try {
        const [gameData, screenshotData] = await Promise.all([
          getGameDetails(id),
          getGameScreenShot(id),
        ]);

        setGame(gameData);
        setScreenshot(screenshotData.results); // array of screenshots
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) loadDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!game) return <p>Game not found.</p>;

  return (
    <div className="game-detail-page">
      <div className="game-hero">
        <img
          src={game.background_image}
          alt={game.name}
          className="game-hero-image"
        />
        <h1 className="game-title">{game.name}</h1>
      </div>

      <div className="game-content">
        <div className="game-description">
          <h2>Description</h2>
          <p dangerouslySetInnerHTML={{ __html: game.description }} />
        </div>

        <div className="game-info">
          <p>
            <strong>Released:</strong> {game.released}
          </p>
          <p>
            <strong>Rating:</strong> {game.rating} / {game.rating_top}
          </p>
        </div>
      </div>
      {screenshot && screenshot.length > 0 && (
        <div className="game-screenshots">
          <h2>Screenshots</h2>
          <div className="screenshot-grid">
            {screenshot.map((shot) => (
              <img
                key={shot.id}
                src={shot.image}
                alt="screenshot"
                className="screenshot-image"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

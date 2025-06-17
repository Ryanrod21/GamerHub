'use client';

import '../app/App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import { fetchPopularGames } from '@/RAWG/rawg';
import GameDetails from './GameDetails';
import Link from 'next/link';

function GameHeroCard() {
  const [popularGame, setPopularGame] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    async function loadPopularGames() {
      try {
        const data = await fetchPopularGames();
        setPopularGame(data.results);
      } catch (error) {
        console.error(error);
      }
    }
    loadPopularGames();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    pauseonHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (selectedGameId) {
    // Show game details view
    return (
      <div>
        <GameDetails
          selectedGameId={selectedGameId}
          onBack={() => setSelectedGameId(null)}
        />
      </div>
    );
  }

  const RenderGame = popularGame.map((game) => {
    return (
      <Link href={`/games-list/${game.id}`}>
        <div key={game.id}>
          <div
            className="GameHeroCard"
            onClick={() => setSelectedGameId(game.id)}
            style={{
              backgroundImage: `url(${game.background_image})`, // ✅ CORRECTION #3: use proper image
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              cursor: 'pointer',
            }}
          >
            <div className="GameCardDetail">
              <h2 className="GameTitleCard">{game.name}</h2>{' '}
              {/* ✅ CORRECTION #4: use game.name */}
              <p className="GameTypeCard">
                {game.genres?.[0]?.name || 'Unknown'}
              </p>
              <div className="GameTagContainer">
                <span className="GameTagCard">
                  {game.metacritic
                    ? `Metacritic: ${game.metacritic}`
                    : 'No Rating'}
                </span>
                <span className="GameTagCard">{game.released}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="GameHero">
      <Slider {...settings}>{RenderGame}</Slider>
    </div>
  );
}

export default GameHeroCard;

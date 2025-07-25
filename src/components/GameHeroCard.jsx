'use client';

import '../app/App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import { fetchPopularGames } from '@/RAWG/rawg';
import GameDetails from './GameDetails';
import Link from 'next/link';
import { settings } from 'firebase/analytics';

function GameHeroCard() {
  const [popularGame, setPopularGame] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    async function loadPopularGames() {
      try {
        const data = await fetchPopularGames(3, 7);

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
    speed: 5000,
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
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

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
                {game.genres?.[1]?.name || 'Unknown'}
              </p>
              <div className="GameTagContainer">
                <span className="GameTagCard">{game.tags?.[0]?.name}</span>
                <span className="GameTagCard">{game.tags?.[2]?.name}</span>
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

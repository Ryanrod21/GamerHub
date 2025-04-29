import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import '../sections.css/ShowMusic.css';
// import noimg from '../assets/noimg.png';
import MusicButton from './MusicButtons';

function MusicComponent({ MusicData }) {
  const musicList = MusicData.slice(0, 3).map((music, index) => {
    return (
      <div key={index} className="scroll-list-container">
        <ul>
          <li className="scroll-song-list-text ">
            {music.song} - {music.album} - {music.artist}
          </li>
        </ul>
      </div>
    );
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const currentTrack = MusicData[currentSong];

  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 100;
          }
          return prev + 1; // You can change speed here
        });
      }, 300); // 300ms = slower, lower this for faster
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(percent);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleNext);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleNext);
    };
  }, [currentSong]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentSong((prev) => (prev === 0 ? MusicData.length - 1 : prev - 1));
    setProgress(0);
    setIsPlaying(true);
  };

  const handleNext = () => {
    setCurrentSong((prev) => (prev === MusicData.length - 1 ? 0 : prev + 1));
    setProgress(0);
    setIsPlaying(true);
  };
  return (
    <div
      className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-lg w-80"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div className="musicImg">
        <img
          className="albumImg"
          src={currentTrack.albumCover ? currentTrack.albumCover : '/noimg.png'}
        />
      </div>
      <div className="scroll-container">
        <div>
          <h1 className="text-xl font-bold scroll-text">
            {currentTrack.song} - {currentTrack.album}
          </h1>
        </div>
      </div>

      <audio ref={audioRef} src={currentTrack.duration} preload="metadata" />

      <div className="w-full bg-gray-300 h-2 rounded my-3 overflow-hidden">
        <div
          className="bg-blue-500 h-2 rounded transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
        {/* <p>Progress: {progress}</p>
        <p>{currentTrack.duration}</p> */}
      </div>

      <div className="flex gap-4 mt-2 musicBtnContainer">
        <MusicButton
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
      <h4 className="musicQueue">Music Queue</h4>
      <div className="songList">{musicList}</div>
    </div>
  );
}

export default MusicComponent;

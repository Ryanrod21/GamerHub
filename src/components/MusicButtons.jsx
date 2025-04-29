import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import '../sections.css/ShowMusic.css';

function MusicButton({ isPlaying, onNext, onPlayPause, onPrev }) {
  return (
    <div className="flex gap-4 musicBtn">
      <button onClick={onPrev}>
        <SkipBack size={18} />
      </button>
      <button onClick={onPlayPause}>
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <button onClick={onNext}>
        <SkipForward size={18} />
      </button>
    </div>
  );
}

export default MusicButton;

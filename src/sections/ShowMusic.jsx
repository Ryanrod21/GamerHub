import MusicComponent from '../components/MusicComponent';
import '../sections.css/ShowMusic.css';

function ShowMusic({ MusicData }) {
  return (
    <div className="Music-Body">
      <MusicComponent MusicData={MusicData} />
    </div>
  );
}

export default ShowMusic;

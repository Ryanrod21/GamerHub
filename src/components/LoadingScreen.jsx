import '../app/App.css';
import './LoadingScreen.css';

export default function LoadingScreen() {
  return (
    <div className="loadingScreen-container">
      <img src="/GHload.png" />
      <div className="loading-circle"></div>
    </div>
  );
}

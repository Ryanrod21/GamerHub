import '../app/App.css';
import ImageSlider from '../components/ImageSlider';

function MainNews({ GameNewsData }) {
  return (
    <div className="MainNews">
      <ImageSlider GameNews={GameNewsData} />
    </div>
  );
}

export default MainNews;

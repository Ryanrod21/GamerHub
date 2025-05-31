import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../app/navbar.css';
import '../app/App.css';

function ImageSlider({ GameNews }) {
  const [currentImage, setCurrentImage] = useState(0);

  const goPrevious = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? GameNews.length - 1 : prevImage - 1
    );
  };

  const goNext = () => {
    setCurrentImage((prevImage) =>
      prevImage === GameNews.length - 1 ? 0 : prevImage + 1
    );
  };

  return (
    <div className="MainNews-Button">
      <img
        src={GameNews[currentImage].img}
        alt={GameNews[currentImage].title}
      />

      <div className="MainNews-SlideBtn">
        <h2>{GameNews[currentImage].title}</h2>
        <p>{GameNews[currentImage].details}</p>
        <div className="main-left-right-btn">
          <button onClick={goPrevious}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button onClick={goNext}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;

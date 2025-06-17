'use client';

import { getGameTrailers } from '@/RAWG/rawg';
import { useEffect, useState } from 'react';

function GetGameTrailers() {
  const [trailers, setTrailer] = useState([]);

  useEffect(() => {
    async function loadGameTrailer() {
      try {
        const data = await getGameTrailers(id);
        setTrailer(data.results);
      } catch (error) {
        console.error(error);
      }
    }
    loadGameTrailer();
  }, []);

  return (
    <div>
      {trailers.length > 0 ? (
        trailers.map((trailer) => (
          <div key={trailer.id}>
            <h3>{trailer.name}</h3>
            <video
              controls
              width="600"
              src={trailer.data.max}
              style={{ borderRadius: '8px' }}
            />
          </div>
        ))
      ) : (
        <p>No trailers available.</p>
      )}
    </div>
  );
}

export default GetGameTrailers;

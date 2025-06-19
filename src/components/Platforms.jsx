import { useEffect, useState } from 'react';
import { getPlatforms } from '@/RAWG/rawg';

function Platforms() {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    async function fetchPlatforms() {
      try {
        const data = await getPlatforms();
        setPlatforms(data);
        console.log('publish', data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPlatforms();
  }, []);

  return <div>hi</div>;
}
export default Platforms;

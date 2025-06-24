// 'use client';

// import { getGameDetails } from '@/RAWG/rawg';
// import { useEffect, useState } from 'react';

// function GameDetails({ selectedGameId, onBack }) {
//   const [gameDetails, setGameDetails] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function loadGameDetails() {
//       setLoading(true);
//       try {
//         const data = await getGameDetails(selectedGameId);
//         setGameDetails(data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadGameDetails();
//   }, [selectedGameId]);

//   if (loading) return <p>Loading game details...</p>;
//   if (!gameDetails) return <p>No game data found.</p>;

//   return (
//     <div>
//       <button onClick={onBack}>← Back to Games</button>

//       <h2>{gameDetails.name}</h2>
//       {gameDetails.background_image && (
//         <img
//           src={gameDetails.background_image}
//           alt={gameDetails.name}
//           style={{ width: '600px', borderRadius: '8px' }}
//         />
//       )}
//       <p dangerouslySetInnerHTML={{ __html: gameDetails.description }}></p>
//       <p>
//         <strong>Released:</strong> {gameDetails.released}
//       </p>
//       <p>
//         <strong>Rating:</strong> {gameDetails.rating} / {gameDetails.rating_top}
//       </p>
//     </div>
//   );
// }
// export default GameDetails;

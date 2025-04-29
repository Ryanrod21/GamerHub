import GameData from '../../data/GameData';
import '../App.css'

const renderedGames = GameData.map((game, index) => {
    return(
        <div className='game-item' key={index} style={game.thebackground} >
           <span> {game.type}</span>
        </div>
    )
})

const GamesListPage = () => {
    return (
        <div className='game-list-container'>
            {renderedGames}
        </div>
    )
}

export default GamesListPage;
import React from 'react';
import * as Minesweeper from '../minesweeper';
import Board from './board';

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {board: new Minesweeper.Board(9, 10)}; // or Minesweeper.Board as React component?
        // ^ this connects us to the backend logic
        this.updateGame = this.updateGame.bind(this);
    }

    updateGame(tile, flagged){
//will change board instance on line 7 to setState using minesweeper.js file
//toggleFlag() or explore()
        if (flagged) {
            tile.toggleFlag();
        } else {
            tile.explore();
        }
        this.setState({ board: this.state.board });
    }

    render(){
        let status;
        if (this.state.board.won()) {
            status = "Congrats you won!";
        } else if (this.state.board.lost()) {
            // status = "💣 KABOOM 💣 You lost! Play again?";
            window.alert("BANG! Game Over.")
        } else {
            status = "";
        }

        return (
            <div>
                < Board board={this.state.board} updateGame={this.updateGame} />
                <h2> {status} </h2>
            </div>
        )
    }
}

export default Game;
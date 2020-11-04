import React from 'react';
import * as Minesweeper from '../minesweeper';
import Board from './board';

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {board: new Minesweeper.Board(9, 10)}; // or Minesweeper.Board as React component?
        // ^ this connects us to the backend logic
        this.updateGame = this.updateGame.bind(this);
        this.newGame = this.newGame.bind(this);
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

    newGame(e) {
        e.preventDefault();
        this.setState({board: new Minesweeper.Board(9, 10)})
    }

    render(){
        let status;
        if (this.state.board.won()) {
           status = (
           <div className="modal-background">
                <div className="win-modal">
                    <h1>YOU DID IT!</h1>
                    <h3>Way to sweep those mines. Think you could do it again?</h3>
                    <button className="new-game" onClick={this.newGame}>Play Again</button>
                </div>
            </div> )
            // status = "Congrats you won!";
        } else if (this.state.board.lost()) {
            status = (
            <div className="modal-background">
                <div className="lose-modal">
                    <h1>GAME OVER.</h1>
                    <h3>Maybe next time...</h3>
                    <button className="new-game" onClick={this.newGame}>Play Again</button>
                </div>
            </div> )
            // status = "BANG! Game Over."
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
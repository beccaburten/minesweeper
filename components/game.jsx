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
           <div className="dark-background">
                <div className="win">
                    <h1>YOU DID IT!</h1>
                    <h3>Way to sweep those mines. Think you could do it again?</h3>
                    <button className="new-game" onClick={this.newGame}>Play Again</button>
                </div>
            </div> )
        } else if (this.state.board.lost()) {
            status = (
            <div className="dark-background">
                <div className="lose">
                    <h1>GAME OVER.</h1>
                    <h3>Maybe next time...</h3>
                    <button className="new-game" onClick={this.newGame}>Play Again</button>
                </div>
            </div> )
        } else {
            status = "";
        }

        return (
            <div>
               <h2> {status} </h2>
                < Board board={this.state.board} updateGame={this.updateGame} />
            </div>
        )
    }
}

export default Game;
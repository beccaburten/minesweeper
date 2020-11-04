import React from 'react';
import Tile from "./tile";

class Board extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        // debugger
        return(
            <div className="board">
                {this.props.board.grid.map((row, i1) => {
                    return <div className= "row" key={i1}>{row.map( (tile, i2) => {
                        return <Tile key={i2} object={tile} updateGame={this.props.updateGame}/>
                    // <Tile/> is React component, object={tile} is JS object
                    }
                    )}</div>
                })}        
            </div>
        )
    }
}

export default Board;
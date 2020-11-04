import React from 'react';

class Tile extends React.Component{

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        let flagged = e.shiftKey;
        this.props.updateGame(this.props.object, flagged)
    } 

    render(){
        let text;
        let cn;
        if (this.props.object.flagged) {
            text = "⚑";
            cn = "tile flagged";
        } else if (this.props.object.bombed && this.props.object.explored) {
            text = "💣";
            cn = "tile bombed";
        } else if (this.props.object.explored) {
            text = this.props.object.adjacentBombCount();
            if(text === 0) text = "";
            cn = "tile revealed"; 
        } else {
            text = "";
            cn = "tile";
        };

        return (
            <div onClick={this.handleClick} className={cn}>
                {text}
            </div>
        )
       
    }
}

export default Tile;

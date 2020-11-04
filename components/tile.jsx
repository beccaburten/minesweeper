import React from 'react';

class Tile extends React.Component{

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        // this.state = {revealed: false, bombed: false, flagged: false}
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
            // text = String.fromCharCode(9873);
            text = "⚑";
           cn = "tile flagged";
        } else if (this.props.object.bombed && this.props.object.explored) {
            // text = "&#9762;";
            text = "💣";
            cn = "tile bombed";
        } else if (this.props.object.explored) {
            text = this.props.object.adjacentBombCount();
            if(text === 0) text = "";
            cn = "tile revealed"; // explored?
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
//Char	Dec	    Hex		Name
//☢	    9762	2622	RADIOACTIVE SIGN
//⚑	    9873	2691	BLACK FLAG
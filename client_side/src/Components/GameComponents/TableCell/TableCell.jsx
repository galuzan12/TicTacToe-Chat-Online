import React, { useState, useContext } from 'react';
import './TableCell.css';
import { GameContext } from '../../../Context/GameContext';

const Table = (props) => {

    // const [isClicked, setIsClicked] = useState(false);
    const [row, col] = props.Index;
    const arrayIndex = 3 * row + col;

    const {name ,play, gameChar, turn, clicked, table} = useContext(GameContext);

    const playTurn = async () => {
        if(clicked[arrayIndex] || !turn) return; // || !turn      
        await play(props.Index);
        // setIsClicked(true);
    }

    return (
        <div onClick={playTurn} className={ clicked[arrayIndex] ? "cell col clickedCell" : "cell col" }>
            <img className="imgChar" src={clicked[arrayIndex] ? table[arrayIndex] : '' } alt=""/>
        </div>
    )
}

export default Table;

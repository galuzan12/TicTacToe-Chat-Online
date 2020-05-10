import React, { useContext } from 'react';
import './ChatBox.css';
import MessageBox from '../MessageBox/MessageBox';
import { GameContext } from '../../../Context/GameContext';


const ChatBox = ({ messages, message }) => {

    const { name } = useContext(GameContext);

    return (
        <div className="chatBox col-12 mp0" >
            {messages && messages.map((msg, index) =>
                <div className={msg.user === name ? "d-flex justify-content-start msgBox" : "d-flex justify-content-end msgBox"} key={index}>
                    <MessageBox sender={msg.user} message={msg.text} classMassegeBox={msg.user === name ? "receiveMassege" : "sendMassege"} />
                </div>
            )}
        </div>
    )
}

export default ChatBox;

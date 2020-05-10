import React, { useState, useEffect ,useContext } from 'react';
import { GameContext } from '../../../Context/GameContext';
import './Chat.css';
import ChatBox from '../ChatBox/ChatBox';
import Input from '../Input/Input';

const Chat = (props) => {

    
    const {setUsers, messages, setMessages, socket} = useContext(GameContext);


    return (
        <div className="container">
            <ChatBox messages={messages} />
            <Input setMessage={props.setMessage} message={props.message} onClick={props.sendMessage} />
        </div>
    )
}

export default Chat;

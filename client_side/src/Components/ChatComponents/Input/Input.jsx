import React from 'react';
import './Input.css';
import { MdSend } from 'react-icons/md';

const ChatBox = (props) => {
        
    return (
        <div className="inputChat">
            {/* <input value={props.message} onKeyPress={e => e.key === "Enter" ? props.onClick(e) : ''} type="text" onChange={e => props.setMessage(e.target.value)} className="form-control"/>
            <button type="submit" onClick={props.onClick} className="btn btn-primary btn-block">שלח</button> */}
            <div className="input-group mp0 sendMesInputDiv">
                <input type="text" className="form-control messageText" id='messageText' placeholder='כתוב הודעה'
                    value={props.message} onKeyPress={e => e.key === "Enter" ? props.onClick(e) : ''} onChange={e => props.setMessage(e.target.value)}
                />
                <div className="input-group-prepend mp0">
                    <button type="submit" onClick={props.onClick} className="btn btn-primary btn-block btnChat"><MdSend className="MdSend" color='rgb(163,233,255)' /></button>
                </div>
            </div>
        </div>
    )
}

export default ChatBox;

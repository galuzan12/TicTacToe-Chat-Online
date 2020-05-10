import React from 'react';
import './MessageBox.css';

const MessageBox = (props) => {

    return (
        <div dir="rtl" className={"messageBox col-md-11 " + props.classMassegeBox}>
            <strong>{props.sender}: </strong>{props.message}
        </div>
    )
}

export default MessageBox;

import React from 'react';
import './Message.css';


function Message(props: {message: string}){
    return <div className="message">
        <label>{props.message}</label>
    </div>
}

export default Message;
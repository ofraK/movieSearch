import React from 'react';


function Message(props: {message: string}){
    return <div className="message">
        <label>{props.message}</label>
    </div>
}

export default Message;
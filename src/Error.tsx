import React from 'react';


function Error(props: {message: string}){
    return <div className="errorMsg">
        <label>{props.message}</label>
    </div>
}

export default Error;
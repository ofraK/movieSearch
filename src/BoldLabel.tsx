import React from 'react';


function BoldLabel(props: {text: string, toBold: string}){

    const index = props.text.toLowerCase().indexOf(props.toBold.toLowerCase());
    const splitText = [props.text.substring(0,index),
        props.text.substring(index,index+props.toBold.length),
        props.text.substring(index+props.toBold.length, props.text.length)];
    return (<label className="boldLbl" >{splitText[0]}<b>{splitText[1]}</b>{splitText[2]}</label>);
}

export default BoldLabel;


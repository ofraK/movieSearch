import React from 'react';


function Item(props: {imageUrl: string, itemName: string}){
    const myAlt = "image of "+props.itemName
    return (
        <span>
            <img src={props.imageUrl} alt={myAlt}/>
            <label>{props.itemName}</label>
        </span>
    );
}

export default Item;




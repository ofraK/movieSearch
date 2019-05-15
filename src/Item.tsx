import React from 'react';
import './Item.css';

import BoldLabel from './BoldLabel'


function Item(props: {imageUrl: string, itemName: string, itemBold:string}){
    return (
        <div className="item">
            <img src={props.imageUrl} alt={" "}/>
            <BoldLabel text={props.itemName} toBold={props.itemBold}/>
        </div>
    );
}

export default Item;




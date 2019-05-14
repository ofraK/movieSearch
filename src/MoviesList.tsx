import React from 'react';
import Item from './Item';


export default class Movies extends React.Component<{moviesInfo: {name: string, image: string}[]}> {

    constructor (props: {moviesInfo: {name: string, image: string}[]}) {
        super(props);

    }

    render(){
        return (
            <ul>
                {this.props.moviesInfo.map((movie) => <li><Item itemName={movie.name} imageUrl={movie.image} /></li>)}
            </ul>
        );
    }

}
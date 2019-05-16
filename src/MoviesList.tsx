import React from 'react';
import './MoviesList.css';
import Item from './Item';

interface IMoviesInformation {
    moviesInfo: {name: string, image: string}[],
    specialWord: string
}


export default class Movies extends React.Component<IMoviesInformation> {

    render(){
        return (
            <ul className="moviesList">
                {this.props.moviesInfo.map(
                    (movie: {name: string, image: string}, index: number) =>
                        <li key={index}><Item itemName={movie.name} itemBold={this.props.specialWord} imageUrl={movie.image} /></li>)}
            </ul>
        );
    }

}
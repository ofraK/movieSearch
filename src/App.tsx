import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import Movies from './MoviesList';


class App extends React.Component {
  constructor() {
    super({});
    //this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  static handleSearchChange(event: React.FormEvent<HTMLInputElement>) {
    let userInput = (event.currentTarget as HTMLInputElement).value;
    //ask imdb
    fetch("http://www.omdbapi.com/?apikey=b239a988&s=*"+userInput+"*&type=movie&page=1")
        .then(res => res.json())
        .then(result => {
          console.log(result);
          if(result.Response == "False"){
            return;
          }else{
            let miniResults: {name: string, image: string}[];
            miniResults = [];
            result.Search.map((movie:any) => miniResults.push({name: movie.Title, image: movie.Poster}));
            ReactDOM.render(
                <Movies moviesInfo={miniResults} />,
                document.getElementById('searchResults')
            );}
          }
          //let results = {"Search":[{"Title":"World War Z","Year":"2013","imdbID":"tt0816711","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"},{"Title":"Jurassic World","Year":"2015","imdbID":"tt0369610","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNzQ3OTY4NjAtNzM5OS00N2ZhLWJlOWUtYzYwZjNmOWRiMzcyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"},{"Title":"Thor: The Dark World","Year":"2013","imdbID":"tt1981115","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTQyNzAwOTUxOF5BMl5BanBnXkFtZTcwMTE0OTc5OQ@@._V1_SX300.jpg"},{"Title":"The Lost World: Jurassic Park","Year":"1997","imdbID":"tt0119567","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMDFlMmM4Y2QtNDg1ZS00MWVlLTlmODgtZDdhYjY5YjdhN2M0XkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_SX300.jpg"},{"Title":"Scott Pilgrim vs. the World","Year":"2010","imdbID":"tt0446029","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTkwNTczNTMyOF5BMl5BanBnXkFtZTcwNzUxOTUyMw@@._V1_SX300.jpg"},{"Title":"Jurassic World: Fallen Kingdom","Year":"2018","imdbID":"tt4881806","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNzIxMjYwNDEwN15BMl5BanBnXkFtZTgwMzk5MDI3NTM@._V1_SX300.jpg"},{"Title":"Master and Commander: The Far Side of the World","Year":"2003","imdbID":"tt0311113","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMjA5NjYyMDM5NV5BMl5BanBnXkFtZTYwOTU5MDY2._V1_SX300.jpg"},{"Title":"The World Is Not Enough","Year":"1999","imdbID":"tt0143145","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMjA0MzUyNjg0MV5BMl5BanBnXkFtZTcwNDY5MDg0NA@@._V1_SX300.jpg"},{"Title":"Team America: World Police","Year":"2004","imdbID":"tt0372588","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTM2Nzc4NjYxMV5BMl5BanBnXkFtZTcwNTM1MTcyMQ@@._V1_SX300.jpg"},{"Title":"Wayne's World","Year":"1992","imdbID":"tt0105793","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMDAyNDY3MjUtYmJjYS00Zjc5LTlhM2MtNzgzYjNlOWVkZjkzL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"}],"totalResults":"5322","Response":"True"}

       )

  }

  render() {
    return (
        <div id="main">
          <div id="search">
            <input type="text" onChange={App.handleSearchChange}/>
          </div>
          <div id="searchResults">
          </div>
        </div>
    );


  }
}

/*
const App = () => {

  return (
    <div id="main">
      <div id="search">
        <input type="text" onChange={Movies.updateMovies}/>
      </div>
      <div id="searchResults">
      </div>
    </div>
  );
};
*/
export default App;



import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Movies from './MoviesList';
import Error from './Error'
import Message from './Message'

class App extends React.Component<{},{disButton: boolean} > {
    static searchId  = 0; //for making sure fetches are on the right order
    static currentSearch = { // for consistant page loading
        page: 0,
        str: "",
        movies: []
    };

    constructor(props: any) {
        super(props);
        this.state = {
            disButton: true
        };
        this.extractMovies = this.extractMovies.bind(this);
        this.updateSearchResult = this.updateSearchResult.bind(this);
        this.getImdbInfo = this.getImdbInfo.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.loadMoreMovies = this.loadMoreMovies.bind(this);
    }

    //get relevant details from imdb returned movies
    extractMovies(imdbMovies: any, str: string): ({name: string, image: string}[]) {
        let movies: {name: string, image: string}[];
        movies = [];
        imdbMovies.Search.forEach((movie: any) => {
            if (movie.Title.toLowerCase().includes(str.toLowerCase()))
                movies.push({name: movie.Title, image: movie.Poster})
        });
        return movies;
    }

    //updates the results according to user's input
    updateSearchResult(element: React.ReactElement, id: number, page: number, str: string): void {
        if (id === App.searchId) {
            App.currentSearch.page = page+1;
            App.currentSearch.str = str;
            let buttonStatus = true;
            if (element.props.moviesInfo !== undefined){
                buttonStatus = false;
                App.currentSearch.movies = element.props.moviesInfo;
            }
            this.setState({
                disButton: buttonStatus
            })
            ReactDOM.render(
                element,
                document.getElementById('searchResults')
            );
        }

    }

    //get movies from imdb, from page 'pageNum' to 'maxPage'. increase maxPage if returned info isn't sufficient
    //returns: callback for next page or render element if done
    getImdbInfo(search: string, originalSearch: string, pageNum: number, maxPage: number, movies: any[], id: number): any {
        return fetch("http://www.omdbapi.com/?apikey=b239a988&s=*" + search + "*&type=movie&page=" + pageNum)
            .then(res => res.json())
            .then(result => {
                if (id !== App.searchId) {
                    return;
                }
                if (result.Response === "False") {
                    this.updateSearchResult((<Error message={result.Error}/>), id, pageNum, originalSearch);
                    return;
                } else {
                    let newMovies = this.extractMovies(result, originalSearch);
                    if (newMovies.length > 0) {
                        movies = movies.concat(newMovies);
                    }
                    if (newMovies.length < 2 || movies.length < 8) {
                        maxPage += 1;
                    }
                    let totalResults = parseInt(result.totalResults);
                    if (pageNum !== maxPage && pageNum < 100 && totalResults / 10 > pageNum)
                        return this.getImdbInfo(search, originalSearch, pageNum + 1, maxPage, movies, id);
                    else {
                        if (movies.length === 0) {
                            this.updateSearchResult((<Error message={'Movie not found!'}/>), id, pageNum, originalSearch);
                            return;
                        }
                        this.updateSearchResult((<Movies moviesInfo={movies} specialWord={originalSearch}/>), id, pageNum, originalSearch)
                    }
                }
            });
    }

    //handles space - problem with imdb api
    static convertInput(input: string): string {
        return input.trim().replace(" ", "+");
    }

    //activates when user changes input
    handleSearchChange(event: React.FormEvent<HTMLInputElement>): void {
        let userInput = (event.currentTarget as HTMLInputElement).value;
        if (userInput === "") {
            return;
        }
        App.searchId += 1;
        let myId = App.searchId;
        let replaceSpace = App.convertInput(userInput);
        this.getImdbInfo(replaceSpace, userInput, 1, 1, [], myId);
        this.updateSearchResult((<Message message={'Searching...'}/>), myId, 0, userInput);
    }

    loadMoreMovies(): void{
        this.getImdbInfo(App.convertInput(App.currentSearch.str), App.currentSearch.str,
            App.currentSearch.page, App.currentSearch.page,
            App.currentSearch.movies, App.searchId);
    }

    render() {
        return (
            <div id="main">
                <div id="search">
                    <input type="text" onChange={this.handleSearchChange} placeholder="Search..."/>
                    <span id="loader">
                        <button disabled={this.state.disButton} onClick={this.loadMoreMovies}>load more</button>
                    </span>
                </div>
                <div id="searchResults">
                </div>
            </div>
        );
    }
}

export default App;



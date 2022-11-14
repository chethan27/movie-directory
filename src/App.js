import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from "./components/MovieList";
import MovieListHeading from './components/MovieListHeading';
import SearchBox from "./components/SearchBox";
import AddToFavourites from "./components/AddToFavourites";
import RemoveFavourite from "./components/RemoveFavourite";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=4570bb0d`;

    const response = await fetch(url);
    const repsonseJson = await response.json();

    if (repsonseJson.Search) {
      debugger
      setMovies(repsonseJson.Search);
    }
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }
  
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID)
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);
		setFavourites(movieFavourites);
  }, []);

  return (
		<div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
			<div className='row'>
        <MovieList movies = {movies} favouriteComponent={AddToFavourites}
         handleFavouriteClick={addFavouriteMovie} />
			</div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
      <div className='row'> 
        <MovieList movies= {favourites} favouriteComponent={RemoveFavourite} 
        handleFavouriteClick={removeFavouriteMovie}/>
      </div>
		</div>
	);
}

export default App;
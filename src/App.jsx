import React from 'react';
import { useState } from 'react';

import MoviesList from './components/MoviesList';
import Preloader from './components/Preloder/Preloader';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]); // State to store fetched movies
  const [loading, setLoading] = useState(false);
  const [iserror, setError] = useState(null)

  const fetchMoviesHandler = async () => {
    try {
      setLoading(true);
      setError(null)
      const response = await fetch('https://swapi.dev/api/films');
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      const fetchedMovies = data.results;

      setMovies(fetchedMovies); // Update the state with fetched movies
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error);
    }
    finally {
      setLoading(false); // Set loading to false when the fetch is complete (success or error)
    }


  };

  var content;

  if(iserror){
    content = <p>{iserror}</p>
  }
  if(loading){
    content =  <Preloader loading={loading} />
  }
  if(movies.length > 0  ){
content = <MoviesList movies={movies} />
  }
  if(null){
    content = 'nothing is here '
  }

  return (  
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
     {content}
      </section>
    </React.Fragment>
  );
}
export default App;

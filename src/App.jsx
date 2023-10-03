import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import Preloader from "./components/Preloder/Preloader";
import MovieForm from "./components/Form/Form";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      const fetchedMovies = data.results;

      setMovies(fetchedMovies);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>No movies found...</p>;

  if (isError) {
    content = <p>{isError.message}</p>; // Use .message to access the error message
  } else if (loading) {
    content = <Preloader loading={loading} />;
  } else if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  return (
    <React.Fragment>
      <section>
        <MovieForm/>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

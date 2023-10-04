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
      const response = await fetch(
        "https://react-http-request-302c5-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      console.log(data);
      let fetchedMovies = [];

      for (let key in data) {
        fetchedMovies.push({
          id: key,
          title: data[key].name,
          release_date: data[key].data,
          opening_crawl: data[key].description
        })
      } // const fetchedMovies = data.results;
      // console.log(fetchedMovies)
      console.log(fetchedMovies)

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
  }
   else if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  const addMovieHandler = async (newMovieData) => {
    // setMovies((prevMovies) => [...prevMovies, newMovieData]);
    // console.log(newMovieData);

    try {
      const res = await fetch(
        "https://react-http-request-302c5-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(newMovieData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <React.Fragment>
      <section>
        <MovieForm onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

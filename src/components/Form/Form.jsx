// MovieForm.js
import React, { useState } from "react";
import "./Form.css";

const MovieForm = ({ onAddMovie }) => {
  const [movieData, setMovieData] = useState({
    name: "",
    date: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(movieData);
    onAddMovie(movieData);
    setMovieData({
      name: "",
      date: "",
      description: "",
    });
  };

  return (
    <div className="form-container">
      <h2>Add a New Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Movie Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={movieData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Release Date:</label>
          <input
            type="text"
            id="date"
            name="date"
            value={movieData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={movieData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add </button>
      </form>
    </div>
  );
};

export default MovieForm;

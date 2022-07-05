import React from "react";
import { useState } from "react";

function SearchResult({ movieData }) {

  // adds movie title and user name to DB to be fetched and used for watchlist data
  const addMovieDataWatchlist = async (poster, title, year, imdbID) => {
    const res = await fetch(`http://localhost:3001/movie`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: "hullo",
        title: title,
        poster: poster,
        year: year,
        imdbID: imdbID,
      }),
    });

    const data = await res.json();

    console.log(data);
  };

  return (
    <div className="search-styling">
      {movieData?.map((arr, index) => {
        if (
          arr === "Movie not found!" ||
          arr === "Please enter a movie title."
        ) {
          return <div key={index}>{arr}</div>;
        }
        return (
          <div key={index} className="poster-container">
            <img className="poster-styling" src={arr.Poster} alt={arr.Title} />
            <div className="poster-container-overlay">
              <div className="poster-container-title">{arr.Title}</div>
              <div className="poster-container-title">{arr.Year}</div>
              <button
                className="poster-container-text"
                onClick={() =>
                  addMovieDataWatchlist(
                    arr.Poster,
                    arr.Title,
                    arr.Year,
                    arr.imdbID
                  )
                }
              >
                Add to watchlist
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SearchResult;

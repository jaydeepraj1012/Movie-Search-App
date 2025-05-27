import React, { use, useEffect, useState } from "react";
import { Star, Calendar, Globe, Tv, ThumbsUp } from "lucide-react";

function MovieListed({ movie }) {
  // const [movieData, setMovieData] = useState([]);
  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
  }; 
  const addToFavorite = (movie) => {
    if (movie) {    
     const existingMovies = localStorage.getItem("favoriteMovies");
     const isAlreadyFavorite = existingMovies
        ? JSON.parse(existingMovies).some(
            (favMovie) => favMovie.id === movie.id
          )
        : false;
      if (isAlreadyFavorite) {
        alert("This movie is already in your favorite list.");
        return;
      }
      let movieData = [];
      if (existingMovies) {
        movieData = [...JSON.parse(existingMovies), movie];
       
      }
      console.log(movieData);
      // Check if the movie already exists in the favorite list
      localStorage.setItem("favoriteMovies", JSON.stringify([...movieData]));
    }
  };
  return (
    <div className="bg-gray-900 text-gray-100 p-4 rounded-xl shadow-lg w-full max-w-[350px] flex flex-col">
      {/* Poster */}
      <div className="w-full h-[500px] overflow-hidden rounded-lg shadow relative">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/src/assets/react.svg"
          }
          alt={movie.title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Title */}
      <h1 className="text-xl font-bold mt-3 truncate">{movie.title}</h1>
      <h2 className="text-sm text-gray-400 truncate">{movie.original_title}</h2>

      {/* Genres */}
      <div className="flex flex-wrap gap-2 mt-2">
        {movie.genre_ids.map((genreId) => (
          <span
            key={genreId}
            className="px-2 py-0.5 bg-blue-900/60 text-xs rounded"
          >
            {genreMap[genreId] || "Genre"}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-3 mt-4 text-sm">
        <div className="flex items-center gap-1">
          <Star className="text-yellow-400" size={16} />
          {movie.vote_average}/10
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="text-green-400" size={16} />
          {movie.release_date}
        </div>
        <div className="flex items-center gap-1">
          <Globe className="text-purple-400" size={16} />
          {movie.original_language.toUpperCase()}
        </div>
      </div>

      {/* Overview */}
      <p className="text-gray-400 text-sm mt-3 line-clamp-4">
        {movie.overview}
      </p>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mt-4">
        <button className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-sm">
          <Tv size={14} />
          Trailer
        </button>
        <button
          className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-sm"
          onClick={() => addToFavorite(movie)}
        >
          <ThumbsUp size={14} />
          Favorite
        </button>
      </div>
    </div>
  );
}

export default MovieListed;

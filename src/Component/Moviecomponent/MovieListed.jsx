import React from 'react'
import { Star, Calendar, Globe, Tv, ThumbsUp } from 'lucide-react';

function MovieListed({ movie }) {
  const genreMap = {
    28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
    80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
    14: "Fantasy", 36: "History"
  };

  return (
    <div className="bg-gray-900 text-gray-100 p-4 rounded-xl shadow-lg w-full max-w-[350px] flex flex-col">
      {/* Poster */}
      <div className="w-full h-[500px] overflow-hidden rounded-lg shadow relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/api/placeholder/300/450";
          }}
        />
      </div>

      {/* Title */}
      <h1 className="text-xl font-bold mt-3 truncate">{movie.title}</h1>
      <h2 className="text-sm text-gray-400 truncate">{movie.original_title}</h2>

      {/* Genres */}
      <div className="flex flex-wrap gap-2 mt-2">
        {movie.genre_ids.map(genreId => (
          <span key={genreId} className="px-2 py-0.5 bg-blue-900/60 text-xs rounded">
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
      <p className="text-gray-400 text-sm mt-3 line-clamp-4">{movie.overview}</p>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mt-4">
        <button className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-sm">
          <Tv size={14} />
          Trailer
        </button>
        <button className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-sm">
          <ThumbsUp size={14} />
          Favorite
        </button>
      </div>
    </div>
  )
}

export default MovieListed;

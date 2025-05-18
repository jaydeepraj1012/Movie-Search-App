import React, { useState, useEffect } from "react";
import MovieListed from "./Moviecomponent/MovieListed";
import Loading from "./Loading";

function MovieSearchApp() {
  const [movieData, setMovieData] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [loading, setLoading] = useState(false);

  const getMovieData = async () => {
    if (movieName === "") {
      alert("Please enter a movie name");
      return;
    }
    setLoading(true);
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=2804451af6e88beb0b3478904a2b9ee3&query=${movieName}`
    );
    const MovieListdata = await response.json();
    console.log(MovieListdata);
    if (MovieListdata.Response === "False") {
      alert(MovieListdata.Error);
      setMovieName("");
      setMovieData([]);
      setLoading(false);
      return;
    }
    setTimeout(() => {
      //    const addmovieData =MovieListdata.results;

      setMovieData(MovieListdata.results);
      console.log(MovieListdata);
      console.log(MovieListdata.results);

      setLoading(false);
    }, 2000);
  };
  function handleform(e) {
    e.preventDefault();
    getMovieData();
  }
  function handleinput(e) {
    const value = e.target.value;
    setMovieName(value);
  }

  return (
    <>
      {loading && <Loading loading={loading} />}
      <form
        onSubmit={handleform}
        className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-600 to-purple-700 p-4"
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Movie Search App
            </h1>
            <p className="text-blue-100">Search for your favorite movies</p>
          </div>
          <input
            type="text"
            placeholder="Enter movie name"
            className="w-full p-2 rounded-lg mb-4"
            value={movieName}
            onChange={handleinput}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Search
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movieData.map((movie) => (
          <MovieListed key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}

export default MovieSearchApp;

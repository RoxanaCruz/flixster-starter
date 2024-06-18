import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie, onClick }) => {
	const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

	return (
		<div className="movie-card" onClick={onClick}>
			<img
				className="movie-card-img"
				src={posterUrl}
				alt={`${movie.title} poster`}
			/>
			<h3>{movie.title}</h3>
			<p> ⭐ {movie.vote_average}</p>
		</div>
	);
};

export default MovieCard;

// export default MovieCard;

// import React from "react";
// import "./MovieCard.css";

// const MovieCard = ({ title, posterPath, voteAverage }) => {
// 	const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

// 	return (
// 		<div className="movie-card">
// 			<img src={posterUrl} alt={`${title} poster`} />
// 			<h3>{title}</h3>
// 			<p>Rating: {voteAverage}</p>
// 		</div>
// 	);
// };

// export default MovieCard;

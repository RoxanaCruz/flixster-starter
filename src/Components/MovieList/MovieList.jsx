import { useEffect, useState } from "react";
import "./MovieList.css";
import MovieCard from "../MovieCard/MovieCard";
import Modal from "../Modal/Modal";

const MovieList = () => {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [filter, setFilter] = useState("popularity.desc");
	const apiKey = import.meta.env.VITE_API_KEY;

	useEffect(() => {
		const fetchMovies = async () => {
			const url = isSearching
				? `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=${page}&api_key=${apiKey}`
				: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${filter}&api_key=${apiKey}`;

			const response = await fetch(url);
			const data = await response.json();

			if (page === 1) {
				setMovies(data.results);
			} else {
				setMovies((prevMovies) => [...prevMovies, ...data.results]);
			}
		};

		fetchMovies();
	}, [page, searchQuery, isSearching, filter]);

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleSearch = () => {
		setPage(1);
		setIsSearching(true);
	};

	const handleLoadMore = () => {
		setPage((prevPage) => prevPage + 1);
	};

	const handleNowPlaying = () => {
		setIsSearching(false);
		setPage(1);
		setSearchQuery("");
	};

	const handleCardClick = async (movieId) => {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
		);
		const data = await response.json();
		setSelectedMovie(data);
	};

	const handleCloseModal = () => {
		setSelectedMovie(null);
	};

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
		setPage(1);
	};

	return (
		<main>
			<header>
				<h1>{isSearching ? "Now Playing" : "Flixster"}</h1>
				<div className="search-bar">
					<input
						type="text"
						value={searchQuery}
						onChange={handleSearchChange}
						placeholder="Search for a movie"
					/>
					<button onClick={handleSearch}>Search</button>
					{isSearching && (
						<button onClick={handleNowPlaying}>Now Playing</button>
					)}
				</div>
				<div className="filter-bar">
					<label htmlFor="filter">Filter by: </label>
					<select id="filter" value={filter} onChange={handleFilterChange}>
						<option value="popularity.desc">Popularity</option>
						<option value="release_date.desc">Release Date</option>
						<option value="vote_average.desc">Vote Average</option>
						<option value="original_title.asc">Title</option>
					</select>
				</div>
			</header>
			<div className="movie-list">
				{movies.map((movie, index) => (
					<MovieCard
						key={index}
						movie={movie}
						onClick={() => handleCardClick(movie.id)}
					/>
				))}
			</div>
			{selectedMovie && (
				<Modal movie={selectedMovie} onClose={handleCloseModal} />
			)}
			{!isSearching && (
				<div className="load-more-container">
					<button className="load-more" onClick={handleLoadMore}>
						Load More
					</button>
				</div>
			)}

			<footer>
				<p> Hello im Flixster! The website that can't play movies</p>
			</footer>
		</main>
	);
};

export default MovieList;

// import { useEffect, useState } from "react";
// import "./MovieList.css";
// import MovieCard from "../MovieCard/MovieCard";
// import Modal from "../Modal/Modal";

// const MovieList = () => {
// 	const [movies, setMovies] = useState([]);
// 	const [page, setPage] = useState(1);
// 	const [searchQuery, setSearchQuery] = useState("");
// 	const [isSearching, setIsSearching] = useState(false);
// 	const [selectedMovie, setSelectedMovie] = useState(null);
// 	const [filter, setFilter] = useState("popularity.desc");
// 	const apiKey = import.meta.env.VITE_API_KEY;

// 	useEffect(() => {
// 		const fetchMovies = async () => {
// 			const url = isSearching
// 				? `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=${page}&api_key=${apiKey}`
// 				: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${filter}&api_key=${apiKey}`;

// 			const response = await fetch(url);
// 			const data = await response.json();

// 			if (page === 1) {
// 				setMovies(data.results);
// 			} else {
// 				setMovies((prevMovies) => [...prevMovies, ...data.results]);
// 			}
// 		};

// 		fetchMovies();
// 	}, [page, searchQuery, isSearching, filter]);

// 	const handleSearchChange = (event) => {
// 		setSearchQuery(event.target.value);
// 	};

// 	const handleSearch = () => {
// 		setPage(1);
// 		setIsSearching(true);
// 	};

// 	const handleLoadMore = () => {
// 		setPage((prevPage) => prevPage + 1);
// 	};

// 	const handleNowPlaying = () => {
// 		setIsSearching(false);
// 		setPage(1);
// 		setSearchQuery("");
// 	};

// 	const handleCardClick = async (movieId) => {
// 		const response = await fetch(
// 			`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
// 		);
// 		const data = await response.json();
// 		setSelectedMovie(data);
// 	};

// 	const handleCloseModal = () => {
// 		setSelectedMovie(null);
// 	};

// 	const handleFilterChange = (event) => {
// 		setFilter(event.target.value);
// 		setPage(1);
// 	};

// 	return (
// 		<main>
// 			<header>
// 				<h1>{isSearching ? "Now Playing" : "Flixster"}</h1>
// 				<div className="search-bar">
// 					<input
// 						type="text"
// 						value={searchQuery}
// 						onChange={handleSearchChange}
// 						placeholder="Search for a movie"
// 					/>
// 					<button onClick={handleSearch}>Search</button>
// 					{isSearching && (
// 						<button onClick={handleNowPlaying}>Now Playing</button>
// 					)}
// 				</div>
// 				<div className="filter-bar">
// 					<label htmlFor="filter">Filter by: </label>
// 					<select id="filter" value={filter} onChange={handleFilterChange}>
// 						<option value="popularity.desc">Popularity</option>
// 						<option value="release_date.desc">Release Date</option>
//             <option value="original_title.asc">Alphabetic</option>
// 					</select>
// 				</div>
// 			</header>
// 			<div className="movie-list">
// 				{movies.map((movie, index) => (
// 					<MovieCard
// 						key={index}
// 						movie={movie}
// 						onClick={() => handleCardClick(movie.id)}
// 					/>
// 				))}
// 			</div>
// 			{selectedMovie && (
// 				<Modal movie={selectedMovie} onClose={handleCloseModal} />
// 			)}
// 			{!isSearching && (
// 				<button className="load-more" onClick={handleLoadMore}>
// 					Load More
// 				</button>
// 			)}
// 		</main>
// 	);
// };

// export default MovieList;

// import { useEffect, useState } from "react";
// import "./MovieList.css";
// import MovieCard from "../MovieCard/MovieCard";
// import Modal from "../Modal/Modal";

// const MovieList = () => {
// 	const [movies, setMovies] = useState([]);
// 	const [page, setPage] = useState(1);
// 	const [searchQuery, setSearchQuery] = useState("");
// 	const [isSearching, setIsSearching] = useState(false);
// 	const [selectedMovie, setSelectedMovie] = useState(null);
// 	const apiKey = import.meta.env.VITE_API_KEY;

// 	useEffect(() => {
// 		const fetchMovies = async () => {
// 			const url = isSearching
// 				? `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=${page}&api_key=${apiKey}`
// 				: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${apiKey}`;

// 			const response = await fetch(url);
// 			const data = await response.json();

// 			if (page === 1) {
// 				setMovies(data.results);
// 			} else {
// 				setMovies((prevMovies) => [...prevMovies, ...data.results]);
// 			}
// 		};

// 		fetchMovies();
// 	}, [page, searchQuery, isSearching]);

// 	const handleSearchChange = (event) => {
// 		setSearchQuery(event.target.value);
// 	};

// 	const handleSearch = () => {
// 		setPage(1);
// 		setIsSearching(true);
// 	};

// 	const handleLoadMore = () => {
// 		setPage((prevPage) => prevPage + 1);
// 	};

// 	const handleNowPlaying = () => {
// 		setIsSearching(false);
// 		setPage(1);
// 		setSearchQuery("");
// 	};

// 	const handleCardClick = async (movieId) => {
// 		const response = await fetch(
// 			`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
// 		);
// 		const data = await response.json();
// 		setSelectedMovie(data);
// 	};

// 	const handleCloseModal = () => {
// 		setSelectedMovie(null);
// 	};

// 	return (
// 		<main>
// 			<header>
// 				<h1>{isSearching ? "Now Playing" : "Flixster"}</h1>
// 				<div className="search-bar">
// 					<input
// 						type="text"
// 						value={searchQuery}
// 						onChange={handleSearchChange}
// 						placeholder="Search for a movie"
// 					/>
// 					<button onClick={handleSearch}>Search</button>
// 					{isSearching && (
// 						<button onClick={handleNowPlaying}>Now Playing</button>
// 					)}
// 				</div>
// 			</header>
// 			<div className="movie-list">
// 				{movies.map((movie, index) => (
// 					<MovieCard
// 						key={index}
// 						movie={movie}
// 						onClick={() => handleCardClick(movie.id)}
// 					/>
// 				))}
// 			</div>
// 			{selectedMovie && (
// 				<Modal movie={selectedMovie} onClose={handleCloseModal} />
// 			)}
// 			{!isSearching && (
// 				<button className="load-more" onClick={handleLoadMore}>
// 					Load More
// 				</button>
// 			)}
// 		</main>
// 	);
// };

// export default MovieList;

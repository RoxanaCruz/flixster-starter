
import React from "react";
import "./Modal.css";

const Modal = ({ movie, onClose }) => {
	if (!movie) return null;

	const { title, runtime, backdrop_path, release_date, genres, overview } =
		movie;

	const backdropUrl = `https://image.tmdb.org/t/p/w500${backdrop_path}`;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="close-button" onClick={onClose}>
					X
				</button>
				<h2>{title}</h2>
				<img src={backdropUrl} alt={`${title} backdrop`} />
				<p>
					<strong>Runtime:</strong> {runtime} ⏰
				</p>
				<p>
					<strong>Release Date:</strong> {release_date}
				</p>
				<p>
					<strong>Genres:</strong>{" "}
					{genres.map((genre) => genre.name).join(", ")}
				</p>
				<p>
					<strong>Overview:</strong> {overview}
				</p>
			</div>
		</div>
	);
};

export default Modal;

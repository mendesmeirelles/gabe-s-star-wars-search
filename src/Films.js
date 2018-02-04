import React from "react";
import PropTypes from "prop-types";

import Loading from "./Loading";
import { fetchData } from "./api";


function FilmGrid(props) {
	return (
		<div className = "container-fluid">
			<div className = "row">
			{props.films.map((film, index) => {
				return (
					<li key={index} className="col-sm-4 col-md-3 col-lg-2 col-xs-6">
					<div className="film-item">
						<ul>
							<li><h3>{film.title}</h3></li>
							<li><b>Director:</b> {film.director}</li>
							<li><b>Producer:</b> {film.producer}</li>
							<li><b>Release date:</b> {film.release_date}</li>
						</ul>
					</div>
					</li>
				)
			}
			)}
			
			
			</div>
		</div>
	)
}

FilmGrid.propTypes = {
	films: PropTypes.array.isRequired,
}

export default class Films extends React.Component {
	constructor(props) {
		console.log(props);
		super(props);
		this.state = {
			films: [],
			selectedFilms: [],
		}
	}

	componentDidMount() {
		fetchData('http://swapi.co/api/films/')
		.then(function(films) {
			this.setState(function() {
				return {
					films: films,
				}
			})
		}.bind(this));
	}

	render() {
		const searchContent = this.props.searchContent;
		var regex = new RegExp(searchContent, "i");
		var { films, selectedFilms} = this.state;
		selectedFilms = films.filter(film => regex.test(film.title));
		return (
			<div>
			{films.length ===0 ? <Loading/> : <FilmGrid films = {selectedFilms} />}

			</div>
		)
	}
}
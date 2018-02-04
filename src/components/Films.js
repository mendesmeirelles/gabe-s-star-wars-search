import React from "react";
import PropTypes from "prop-types";

import FilmPopup from "./FilmPopup"
import Loading from "./Loading";
import InfiniteScrolling from "./InfiniteScrolling";
import { fetchData } from "../utils/api";


function FilmGrid(props) {
	const filmGrid = 
	props.films.map((film, index) => {
		return (
			<li key={index} className="col-sm-6 col-md-4 col-lg-3">
			<div className="film-item">
				<ul>
					<li><h3>{film.title}</h3></li>
					<li><b>Director:</b> {film.director}</li>
					<li><b>Producer:</b> {film.producer}</li>
					<li><b>Release date:</b> {film.release_date}</li>
					<li>
						<button 
						type="button" className="btn btn-info" 
						data-toggle="modal" 
						data-target={"#myModal"+index}>More Info
						</button>
						<div className="modal fade" id={"myModal"+index} role="dialog">
							<div className="modal-dialog">
								<FilmPopup title={film.title}
								director={film.director}
								producer={film.producer} 
								releaseDate={film.release_date} 
								characters={film.characters} 
								openingCrawl={film.opening_crawl} />
							</div>
						</div>
					</li>
				</ul>
			</div>
			</li>
			)
		});
	return (
		<div className = "container-fluid">
			<div className = "row">
				<InfiniteScrolling grids = {filmGrid} itemPerPage = {6} />
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
		const searchContent = this.props.searchContent.trim();
		var regex = new RegExp(searchContent, "i");
		var { films, selectedFilms} = this.state;
		selectedFilms = films.filter(film => regex.test(film.title));
		
		if(films.length !== 0 && selectedFilms.length === 0) {
			return (<h2> No Matches! </h2>)
		}else {
			return (
				<div>
				{films.length ===0 ? <Loading/> : <FilmGrid films = {selectedFilms} />}

				</div>
			)			
		}

	}
}
import React from "react";
import { fetchItem } from "../utils/api";

export default class PeoplePopup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: props.name,
			gender: props.gender,
			height: props.height,
			birthYear: props.birthYear,
			homeworld: props.homeworld,
			species: props.species,
			films:props.films
		}
	}
	
	componentDidMount() {
		fetchItem(this.state.homeworld)
		.then(function(res) {
			this.setState(function() {
				return {
					homeworld: res,
				}
			})
		}.bind(this));

		fetchItem(this.state.species)
		.then(function(res) {
			this.setState(function() {
				return {
					species: res,
				}
			})
		}.bind(this));
		
		var getFilms = [];
		const filmsUrl = this.state.films;

		for(var i in filmsUrl) {
			getFilms.push(fetchItem(filmsUrl[i]));
		}

		Promise.all(getFilms)
		.then(function(res) {
			this.setState(function() {
				return {
					films: res,
				}
			}) 
		}.bind(this));
		
	}
	
	render() {
		const { name, gender, height, birthYear, homeworld, species, films } = this.state;
		const filmsList = films.map((film,index) => 
			<span key={index}>{film}, </span>);
		return (
			<div className="modal-content">
			<div className="modal-body">
				<h3 className="modal-title">{name}</h3>
				<p><b>Gender:</b> {gender}</p>
				<p><b>Height:</b> {height}</p>
				<p><b>Birth Year:</b> {birthYear}</p>
				<p><b>Homeworld:</b> {homeworld}</p>
				<p><b>Species:</b> {species}</p>
				<p><b>Films:</b> {filmsList}</p>
			</div>
			<div className="modal-footer">
				<button type="button" 
				className="btn btn-default" 
				data-dismiss="modal">Close</button>
			</div>
			</div>
		)
	}
}
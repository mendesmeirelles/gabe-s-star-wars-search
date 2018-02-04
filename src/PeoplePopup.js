import React from "react";
import { fetchItem } from "./api";

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
					homeworld: res.name,
				}
			})
		}.bind(this));

		fetchItem(this.state.species)
		.then(function(res) {
			this.setState(function() {
				return {
					species: res.name,
				}
			})
		}.bind(this));
		/**
		var getFilms = [];

		for(var i in this.state.films) {
			getFilms.push(fetchItem(this.state.films[i]));
		}

		Promise.all(getFilms)
		.then(function(res) {
			this.setState(function() {
				return {
					films: res,
				}
			}) 
		}.bind(this));
		*/
	}

	render() {
		const { name, gender, height, birthYear, homeworld, species, films } = this.state;
		return (
			<div className="modal-content">
			<div className="modal-body">
				<h3 className="modal-title">{name}</h3>
				<p>Gender: {gender}</p>
				<p>Height: {height}</p>
				<p>Birth Year: {birthYear}</p>
				<p>Homeworld: {homeworld}</p>
				<p>Species: {species}</p>
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
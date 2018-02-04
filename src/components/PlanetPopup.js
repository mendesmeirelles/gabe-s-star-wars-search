import React from "react";
import { fetchItem } from "../utils/api";


export default class PlanetPopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			diameter: props.diameter,
			gravity: props.gravity,
			terrain: props.terrain,
			residents: props.residents,
			population: props.population
		}
	}
	
	componentWillMount() {
		const residentsUrl = this.state.residents;
		var getResidents = [];

		for(var i in residentsUrl) {
			getResidents.push(fetchItem(residentsUrl[i]));
		}

		Promise.all(getResidents)
		.then(function(res) {
			this.setState(function() {
				return {
					residents: res,
				}
			}) 
		}.bind(this));
	}
	
	render() {
		const { name, diameter, gravity, terrain, residents, population } = this.state;
		const residentsList = residents.map((resident,index) => 
			<span key={index}>{resident}, </span>);
		return (
			<div className="modal-content">
			<div className="modal-body">
				<h3 className="modal-title">{name}</h3>
				<p><b>Diameter:</b> {diameter}</p>
				<p><b>Gravity:</b> {gravity}</p>
				<p><b>Terrain:</b> {terrain}</p>
				<p><b>Population:</b> {population}</p>
				<p><b>Residents:</b> {residentsList}</p>
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
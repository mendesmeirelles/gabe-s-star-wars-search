import React from "react";
import PropTypes from "prop-types";

import PlanetPopup from "./PlanetPopup"
import Loading from "./Loading";
import InfiniteScrolling from "./InfiniteScrolling";
import { fetchData } from "../utils/api";


function PlanetGrid(props) {
	const planetGrid = 
	props.planets.map((planet, index) => {
		return (
			<li key={index} className="col-sm-6 col-md-4 col-lg-3">
			<div className="film-item">
				<ul>
					<li><h3>{planet.name}</h3></li>
					<li><b>Diameter:</b> {planet.diameter}</li>
					<li><b>Gravity:</b> {planet.gravity}</li>
					<li><b>Terrain:</b> {planet.terrain}</li>
					<li>
						<button 
						type="button" className="btn btn-info" 
						data-toggle="modal" 
						data-target={"#myModal"+index}>More Info
						</button>
						<div className="modal fade" id={"myModal"+index} role="dialog">
							<div className="modal-dialog">
								<PlanetPopup name={planet.name}
								diameter={planet.diameter}
								gravity={planet.gravity} 
								terrain={planet.terrain} 
								residents={planet.residents} 
								population={planet.population} />
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
				<InfiniteScrolling grids = {planetGrid} itemPerPage = {6} />
			</div>
		</div>
	)
}

PlanetGrid.propTypes = {
	planets: PropTypes.array.isRequired,
}

export default class Planets extends React.Component {
	constructor(props) {
		console.log(props);
		super(props);
		this.state = {
			planets: [],
			selectedPlanets: [],
		}
	}

	componentDidMount() {
		fetchData('http://swapi.co/api/planets/')
		.then(function(planets) {
			this.setState(function() {
				return {
					planets: planets,
				}
			})
		}.bind(this));
	}

	render() {
		const searchContent = this.props.searchContent.trim();
		var regex = new RegExp(searchContent, "i");
		var { planets, selectedPlanets} = this.state;
		selectedPlanets = planets.filter(planet => regex.test(planet.name));
		
		if(planets.length !== 0 && selectedPlanets.length === 0) {
			return (<h2> No Matches! </h2>)
		}else {
			return (
				<div>
				{planets.length ===0 ? <Loading/> : <PlanetGrid planets = {selectedPlanets} />}

				</div>
			)			
		}

	}
}
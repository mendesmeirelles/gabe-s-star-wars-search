import React from "react";
import PropTypes from "prop-types";

import PeoplePopup from "./PeoplePopup";
import Loading from "./Loading";
import InfiniteScrolling from "./InfiniteScrolling";
import { fetchData } from "../utils/api";

function PeopleGrid(props) {
	const peopleGrid = 
	props.people.map((item, index) => {
		return (
			<li key={index} className="col-sm-4 col-md-3 col-lg-2 col-xs-6">
			<div className="film-item">
				<ul>
					<li><h3>{item.name}</h3></li>
					<li><b>Birth year:</b> {item.birth_year}</li>
					<li><b>Gender:</b> {item.gender}</li>
					<li>
						<button 
						type="button" className="btn btn-info" 
						data-toggle="modal" 
						data-target={"#myModal"+index}>More Info
						</button>
						<div className="modal fade" id={"myModal"+index} role="dialog">
							<div className="modal-dialog">
								<PeoplePopup name={item.name}
								gender={item.gender}
								height={item.height} 
								birthYear={item.birth_year} 
								homeworld={item.homeworld} 
								species={item.species} 
								films={item.films} />
							</div>
						</div>
					</li>
				</ul>
			</div>
			</li>
		)
		}
	);

	return (
		<div className = "container-fluid">
			<div className = "row">
				<InfiniteScrolling grids = {peopleGrid} itemPerPage = {12}/>
			</div>
		</div>
	)

}

PeopleGrid.propTypes = {
	people: PropTypes.array.isRequired,
}

export default class People extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			people: [],
			selectedPeople: [],
		}
	}

	componentDidMount() {
		/**
 		 * Currently I fetch all data from the "database" every time
 		 * the user reloads the page. One optimization could be that I 
 		 * cache the previously fetched data, and compare the "creation_time"
 		 * of the cache and the "modified_time" of the data in the URL
 		 * to determine whether or not to re-fetch it again. 
		 */
		fetchData('http://swapi.co/api/people/')
			.then(function(data) {
				this.setState(function() {
				return {
					people: data,
				}
			})
		}.bind(this));
	}

	render() {
		const searchContent = this.props.searchContent.trim();
		var regex = new RegExp(searchContent, "i");
		var { people, selectedPeople} = this.state;
		selectedPeople = people.filter(item => regex.test(item.name));
		if(people.length !== 0 && selectedPeople.length === 0) {
			return (<h2> No Matches! </h2>)
		}else {
			return (
				<div>
				{people.length === 0 ? <Loading/> : <PeopleGrid 
					people = {selectedPeople}/>
				}

				</div>
			)			
		}

	}
}

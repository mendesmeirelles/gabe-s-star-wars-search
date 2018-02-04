import React from "react";
import PropTypes from "prop-types";

import PeoplePopup from "./PeoplePopup";
import Loading from "./Loading";
import { fetchData, fetchItem } from "./api";

function PeopleGrid(props) {
	return (
		<div className = "container-fluid">
			<div className = "row">
			{props.people.map((item, index) => {
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
								data-target="#myModal">More Info
								</button>
								<div className="modal fade" id="myModal" role="dialog">
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
		)}
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
		this.getInfo = this.getInfo.bind(this);
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
				console.log(data);
				this.setState(function() {
				return {
					people: data,
				}
			})
		}.bind(this));
	}

	getInfo(url) {
		fetchItem(url)
		.then(function(res) {
			return res;
		})
	}

	render() {
		const searchContent = this.props.searchContent;
		var regex = new RegExp(searchContent, "i");
		var { people, selectedPeople} = this.state;
		selectedPeople = people.filter(item => regex.test(item.name));
		return (
			<div>
			{people.length === 0 ? <Loading/> : <PeopleGrid 
				people = {selectedPeople} 
				getInfo = {this.getInfo}/>
			}

			</div>
		)
	}
}
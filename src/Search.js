import React from "react";
//import { Link } from "react-router-dom";

export default class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedCategory: "",
			searchContent: "",
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.selectCategory = this.selectCategory.bind(this);
	}

	selectCategory(event) {
		var selectedValue = event.target.value;
		console.log(selectedValue);
		this.props.onSelectCategory(selectedValue);
		this.setState(function() {
			return {
				selectCategory: selectedValue,
			}
		})

	}

	handleChange(event) {
		var input = event.target.value;
		this.setState(function() {
			return {
				searchContent: input,
			}
		})

	}

	handleSubmit() {
		this.props.onSubmit(this.state.searchContent);
	}

	render() {
		return (
			<div className="search-bar">
				<select className="btn-default btn-select-light btn-lg" onChange={this.selectCategory}>
					<option value="films">Films</option>
					<option value="people">People</option>
					<option value="planets">Planets</option>
					<option value="species">Species</option>
					<option value="starships">Starships</option>
					<option value="vehicles">Vehicles</option>
				</select>
				<input className="input-lg" type="text" 
				value={this.state.searchContent}
				onChange={this.handleChange}/>
				<button type="button" 
				className='btn btn-secondary btn-lg' onClick = {this.handleSubmit}>Submit</button>
			</div>
		)
	}
}
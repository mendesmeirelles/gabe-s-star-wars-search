import React from "react";
import { fetchItem } from "../utils/api";


export default class FilmPopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: props.title,
			director: props.director,
			producer: props.producer,
			releaseDate: props.releaseDate,
			characters: props.characters,
			openingCrawl: props.openingCrawl
		}
	}
	
	componentWillMount() {
		const charsUrl = this.state.characters;
		var getChars = [];

		for(var i in charsUrl) {
			getChars.push(fetchItem(charsUrl[i]));
		}

		Promise.all(getChars)
		.then(function(res) {
			this.setState(function() {
				return {
					characters: res,
				}
			}) 
		}.bind(this));
	}
	
	render() {
		const { title, director, producer, releaseDate, characters, openingCrawl } = this.state;
		const charList = characters.map((character,index) => 
			<span key={index}>{character}, </span>);
		return (
			<div className="modal-content">
			<div className="modal-body">
				<h3 className="modal-title">{title}</h3>
				<p><b>Director:</b> {director}</p>
				<p><b>Producer:</b> {producer}</p>
				<p><b>Release Date:</b> {releaseDate}</p>
				<p><b>Characters:</b> {charList}</p>
				<p><b>Opening Crawl:</b> {openingCrawl}</p>
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
import React from "react";
import InfiniteScroll from "react-infinite-scroller";

export default class InfiniteScrolling extends React.Component {
	constructor(props) {

		super(props);
		this.state = {
			itemPerPage: props.itemPerPage,
			currentPageNum: 0,
			maxPageNum: Math.ceil(props.grids.length/props.itemPerPage),
			nextPage: true,
			totalItems: props.grids,
			currentItems: [],
		}
		this.loadPage = this.loadPage.bind(this);

	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.grids !== prevProps.grids) {
			this.setState(function() {
				return {
					itemPerPage: this.props.itemPerPage,
					currentPageNum: 0,
					maxPageNum: Math.ceil(this.props.grids.length/this.props.itemPerPage),
					nextPage: true,
					totalItems: this.props.grids,
					currentItems: [],
				}
			})
		}
	}

	loadPage() {
		const  { itemPerPage, maxPageNum, nextPage, totalItems }= this.state;
		//console.log(maxPageNum,this.state.currentPageNum);
		if(nextPage === true) {
			const currentPageNum = this.state.currentPageNum +1;
			if(currentPageNum < maxPageNum) {
				const displayItems = totalItems.slice(0,currentPageNum*itemPerPage);
				this.setState(function() {
					return {
						currentPageNum: currentPageNum,
						currentItems: displayItems,
					}
				})			
			}else if(currentPageNum === maxPageNum) {
				const displayItems = totalItems;
				this.setState(function() {
					return {
						currentPageNum : currentPageNum,
						currentItems: displayItems,
						nextPage: false,
					}
				})
			}
		}
	}

	render() {
		return(
			<InfiniteScroll pageStart={0} 
			loadMore = {this.loadPage}
			hasMore = {this.state.nextPage}
			loader = {<div className="loader">Loading ...</div>}
			threshold = {20}>
			{this.state.currentItems}
			</InfiniteScroll>
		)
	}
}
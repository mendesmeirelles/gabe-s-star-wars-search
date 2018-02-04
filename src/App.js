import React, { Component } from 'react';
import PropTypes from "prop-types";

//import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Films from "./Films";
import People from "./People";
import Search from "./Search";

//import logo from './logo.svg';
import './App.css';


function GridView(props) {
  console.log(props);
  const { category, searchContent } = props;
  
  switch(category) {
      case 'films': 
        return <Films searchContent = {searchContent}/>;
      case "people":
        return <People searchContent = {searchContent}/>;

      default:
        return <Home/>;
  }
}

GridView.propTypes = {
  category: PropTypes.string.isRequired,
  searchContent: PropTypes.string.isRequired,
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedCategory: "films",
      searchContent: "",
    }
    this.updateCategory = this.updateCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateCategory(category) {
    this.setState(function() {
      return {
        selectedCategory: category,
      }
    })
  }

  handleSubmit(input) {
    this.setState(function() {
      //console.log(input);
      return {
        searchContent: input,
      }
    })
  }
 
  render() {
    return (
        <div>
          <div className="App-header">
            <h2>Welcome to Star War Search</h2>
            <Search onSelectCategory = {this.updateCategory} onSubmit = {this.handleSubmit}/>
          </div>
          <GridView category={this.state.selectedCategory} searchContent={this.state.searchContent}/>
        </div>

    );
  }
}

export default App;

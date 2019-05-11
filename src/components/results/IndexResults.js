/** @format */

// IndexResults.js -- serves results components

import React, { Component } from "react";
import Results from "./Results";

const allDrinksURL = "http://165.227.142.105:5000/api/v1.1/allDrinks/";

class IndexResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vizReady: false,
      allDrinks: {},
    };
    this.getAllDrinks = this.getAllDrinks.bind(this);
  }

  getAllDrinks() {
    //gets all drinks for Viz
    fetch(allDrinksURL)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          allDrinks: data,
          vizReady: true,
        });
      })
      .catch(error => {
        console.log("Fetch error in IndexResults.js:", error);
      });
  }

  componentDidMount() {
    this.getAllDrinks();
  }

  render() {
    return (
      <div>
        <Results
          query={this.props.query}
          url={this.props.url}
          allDrinks={this.state.allDrinks}
          viz={this.props.viz}
        />
      </div>
    );
  }
}

export default IndexResults;

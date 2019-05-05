/** @format */

// IndexResults.js -- serves results components

import React, { Component } from "react";
import Results from "./Results";
import Loading from "../utilities/Loading";

const nameUrl = "http://165.227.142.105:5000/api/v1.0/names/?name=";

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
    fetch(nameUrl)
      .then(response => {
        return response.json();
      })
      .then(allDrinks => {
        this.setState({ allDrinks: allDrinks, vizReady: true });
      })
      .catch(error => {
        console.log("Fetch error in IndexResults.js:", error);
      });
  }

  componentDidMount() {
    this.getAllDrinks();
  }

  render() {
    if (this.state.vizReady) {
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
    } else {
      return <Loading />;
    }
  }
}

export default IndexResults;

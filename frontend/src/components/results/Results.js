/** @format */

// Results, makes api call and passes results to drinklist

import React, { Component } from "react";
import Info from "./Info";
import Viz from "./Viz";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      received: false,
      picks: [],
    };
    this.apiCall = this.apiCall.bind(this);
  }

  apiCall() {
    // calls Flask API
    let api = this.props.url;
    const url = api.concat(this.props.query);
    fetch(url).then(response => {
      response
        .json()
        .then(data => {
          this.setState({ picks: data, received: true });
        })
        .catch(error => {
          console.log("Fetch error in Results.js:", error);
        });
    });
  }

  componentDidMount() {
    if (this.state.received) {
      this.apiCall();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.apiCall();
    }
  }
  render() {
    //console.log("Results.js fetch response (picks):", this.state.picks);
    const allVizDrinks = this.props.allDrinks;
    const drinkList = this.props.drinkList;
    const picks = this.state.picks;
    if (this.props.allDrinks && this.props.viz) {
      return (
        <>
          <div id="yv_viz">
            <Viz allDrinks={allVizDrinks} picks={picks} drinkList={drinkList} />
          </div>
          <div id="yv_results">
            <Info drinkList={drinkList} picks={picks} viz={this.props.viz} />
          </div>
        </>
      );
    } else if (this.props.allDrinks) {
      return (
        <>
          <div id="nv_results">
            <Info drinkList={drinkList} picks={picks} viz={this.props.viz} />
          </div>
        </>
      );
    } else {
      return null;
    }
  }
}

export default Results;

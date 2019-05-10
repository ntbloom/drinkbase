/** @format */

// Results, makes api call and passes results to drinklist

import React, { Component } from "react";
import Drinklist from "./Drinklist";
import Viz from "./Viz";
import Loading from "../utilities/Loading";

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
    const allDrinks = this.props.allDrinks;
    const picks = this.state.picks;
    if (this.state.received && this.props.viz) {
      return (
        <div className="resultsWrapper">
          <Viz allDrinks={allDrinks} picks={picks} />
          <Drinklist allDrinks={allDrinks} picks={picks} />
        </div>
      );
    } else if (this.state.received) {
      return (
        <div className="resultsWrapper">
          <Drinklist allDrinks={allDrinks} picks={picks} />
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default Results;

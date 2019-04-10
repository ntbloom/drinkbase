// Results, makes api call and passes results to drinklist

import React, { Component } from "react";
import Drinklist from "./Drinklist";
import Viz from "./Viz";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      received: false, 
      picks: []
    };
    this.apiCall = this.apiCall.bind(this);
  }

  apiCall() {
    // calls Flask API
    let api = this.props.url;
    const url = api.concat(this.props.query);
    fetch(url, {credentials: "include"})
      .then(
        response => {
          response.json()
      .then(data => {
        this.setState({drinks: data});
        let picks = [];
        for (var i=0; i<data.Drinks.length; i++) {
          picks.push(data.Drinks[i].Name)
        }
        this.setState({picks: picks, received: true});
      })
      .catch(error => {
        console.log("Fetch error in Results.js:", error);
      })
      }
    )}

  componentDidMount() {
    this.apiCall();
  }
  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.apiCall();
    }
  }
  render() {
    if (this.state.received) {
      return (
        <div>
          <Viz
            allDrinks={this.props.allDrinks}
            picks={this.state.picks}
          />
          <Drinklist 
            drinks={this.state.drinks.Drinks} 
          />
        </div>
      );
    } else {
      return null
    };
  }
}

export default Results;

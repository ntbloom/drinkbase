// Results, makes api call and passes results to drinklist

import React, { Component } from "react";
import Drinklist from "./Drinklist";
import Viz from "./Viz";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      received: false, 
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
        this.setState({drinks: data, received: true}); 
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
    //console.log("drinks: ", this.state.drinks.Drinks);
    //console.log("query: ", this.props.query);
    if (this.state.received) {
      return (
        <div>
          <Drinklist drinks={this.state.drinks.Drinks} />
        </div>
      );
    } else {
      return null
    };
  }
}

export default Results;

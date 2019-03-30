// Results, makes api call and passes results to drinklist

import React, { Component } from "react";
import Drinklist from "./Drinklist";
import Viz from "../Viz";



class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveDrinks: false,
      drinks: '',
    };
    this.apiCall = this.apiCall.bind(this);
    this.getDrinks = this.getDrinks.bind(this);
  }
  apiCall(url, stateVariable) {
    // calls Flask API
    fetch(url, {credentials: "include"})
      .then(response => {
        return response.json();
      })
      .then(drinks => {
        return drinks; 
      })
      .then(stateful => {
        this.setState({stateVariable: true});
      })
  }

  getDrinks() {
    // calls Python api
    const api = this.props.url;
    const url = api.concat(this.props.query);
    const drinks = this.apiCall(url, "haveDrinks");
    if (this.state.haveDrinks) {
      this.setState({drinks: drinks});
      this.setState({submitted: true});
    }
  }

  componentDidMount() {
    //console.log("url: ", url);
    this.getDrinks();
    console.log("this.state.drinks:", this.state.drinks);
  }
  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.getDrinks();
    }
  }
  render() {
    //console.log("drinks: ", this.state.drinks.Drinks);
    //console.log("query: ", this.props.query);
    if (this.state.submitted) {
      return (
        <div>
          <Drinklist drinks={this.state.drinks.Drinks} />
        </div>
      );
    } else {
      return null
      // eslint-disable-next-line
    };
  }
}

export default Results;

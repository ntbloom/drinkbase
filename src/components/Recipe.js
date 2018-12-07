// Recipe, list of drinks returned by search form, rendered in html

import React, { Component } from "react";
//import axios from "axios";

//const api = "http://localhost:5000/api/v1.0/names/?name=";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: this.props.drinks,
      drink: this.props.drink,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.drink !== prevProps.drink) {
      this.setState({drink: this.props.drink});
    }
  }
  render() {
    let drinks = this.state.drinks;
    return (
      <p>{this.props.drink} (rendered by Recipe.js)</p>
    );
  }
}

export default Recipe;

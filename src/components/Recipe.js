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
      showRecipe: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      showRecipe: !prevState.showRecipe
    }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.drink !== prevProps.drink) {
      this.setState({drink: this.props.drink});
    }
  }
  render() {
    const drinks = this.state.drinks;
    return (
      <p className="hideshow" onClick={this.handleClick}>
       [{this.state.showRecipe ? '-' : '+'}]
      </p>
    );
  }
}

export default Recipe;

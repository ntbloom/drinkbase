// Recipe, list of drinks returned by search form, rendered in html

import React, { Component } from "react";


class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: this.props.drinks,
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.setState({drinks: this.props.drinks});
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

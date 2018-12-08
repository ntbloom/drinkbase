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
    this.printRecipe = this.printRecipe.bind(this);
  }

  printRecipe() {
    const drink = this.state.drink;
    const drinks = this.state.drinks;
    const recipe = ["first item"];

    return (<p>{recipe}</p>);
  }

  handleClick() {
    this.setState(prevState => ({
      showRecipe: !prevState.showRecipe
    }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.drink !== prevProps.drink) {
      this.setState({drink: this.props.drink});
      this.setState({drinks: this.props.drink});
    }
  }
  render() {
    const drinks = this.state.drinks;
    const showRecipe = this.state.showRecipe;
    return (
      <div 
        onClick={this.handleClick}
        className="recipe"
      >
        {showRecipe ? (
          <div>{this.printRecipe()}</div>
        ) : (
          <p class="hideshow">(show recipe)</p>
        )}
      </div>
    );
  }
}

export default Recipe;

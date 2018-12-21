// Recipe, list of drinks returned by search form, rendered in html

import React, { Component } from "react";


class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRecipe: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.printRecipe = this.printRecipe.bind(this);
  }

  printRecipe() {
    const drink = this.props.drink;
    const drinks = this.props.drinks;
    console.log(drinks)
    const recipeArray = []
    let recipe = drinks.filter(function(d) {
      return d.Name === drink})
    recipe = recipe[0].Recipe
    for (let i = 0; i < recipe.length; i++) {
      let amount = recipe[i].Amount;
      let unit = recipe[i].Unit;
      //TODO: convert to fractions
      let ingredient = recipe[i].Ingredient;
      if (ingredient > 1 && unit === "dash") {
        unit = "dashes";
      }
      let fullIngred = ''
      if (unit === "each") {
        fullIngred = amount + " " + ingredient; 
      } else {
        fullIngred = amount + " " + unit + " " + ingredient;
      }
      recipeArray.push(fullIngred)
    }
    const fullRecipe = recipeArray.map((ingredient) =>
      <p key={recipeArray.indexOf(ingredient).toString()}>
        {ingredient}
      </p>
    );
    return (<div>{fullRecipe}</div>);
  }

  handleClick() {
    this.setState(prevState => ({
      showRecipe: !prevState.showRecipe
    }));
  }
  
  render() {
    const showRecipe = this.state.showRecipe;
    return (
      <div 
        onClick={this.handleClick}
        className="recipe"
      >
        {showRecipe ? (
          <div>{this.printRecipe()}</div>
        ) : (
          <p className="hideshow">(show recipe)</p>
        )}
      </div>
    );
  }
}

export default Recipe;

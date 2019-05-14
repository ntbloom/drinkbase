/** @format */

// Recipe, list of drinks returned by search form, rendered in html

import React, { Component } from "react";

function fractionize(num) {
  // convert decimal to fractions
  if (num === 0.25) {
    return "1/4";
  } else if (num === 0.5) {
    return "1/2";
  } else if (num === 0.75) {
    return "3/4";
  } else if (num === 1.25) {
    return "1 1/4";
  } else if (num === 1.5) {
    return "1 1/2";
  } else if (num === 1.75) {
    return "1 3/4";
  } else if (num === 2.25) {
    return "2 1/4";
  } else if (num === 2.5) {
    return "2 1/2";
  } else if (num === 2.75) {
    return "2 3/4";
  } else {
    return num;
  }
}

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
    const recipeArray = [];
    let recipe = drink.Recipe;
    const garnish = <p>{drink.Data.Garnish} garnish</p>;
    const build = <p id="build">{drink.Data.Build}</p>;

    for (let i = 0; i < recipe.length; i++) {
      let amount = fractionize(recipe[i].Amount);
      let unit = recipe[i].Unit;
      let ingredient = recipe[i].Ingredient;
      if (amount > 1 && unit === "dash") {
        unit = "dashes";
      }
      let fullIngred = "";
      if (unit === "each") {
        fullIngred = amount + " " + ingredient;
      } else {
        fullIngred = amount + " " + unit + " " + ingredient;
      }
      recipeArray.push(fullIngred);
    }
    const fullRecipe = recipeArray.map(ingredient => (
      <p key={recipeArray.indexOf(ingredient).toString()}>{ingredient}</p>
    ));

    return (
      <div>
        {fullRecipe}
        {garnish}
        {build}
      </div>
    );
  }

  handleClick() {
    this.setState(prevState => ({
      showRecipe: !prevState.showRecipe,
    }));
  }

  render() {
    const showRecipe = this.state.showRecipe;
    return (
      <div onClick={this.handleClick} className="recipe">
        {showRecipe ? (
          <div>{this.printRecipe()}</div>
        ) : (
          <p className="hideshow">(click to show full recipe)</p>
        )}
      </div>
    );
  }
}

export default Recipe;

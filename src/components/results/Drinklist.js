/** @format */

// Drinklist, list of drinks returned by search form, rendered in html

import React, { Component } from "react";
import Recipe from "./Recipe";

function pullIngreds(obj) {
  // converts ingredient object into an array
  let ingredients = [];
  for (let i = 0; i < obj.length; i++) {
    ingredients.push(" " + obj[i]["Ingredient"]);
  }
  ingredients = ingredients.toString();
  return ingredients;
}

function getColor(drink) {
  // dynamically renders colors based on glass
  let style = drink.Data.Style;
  style = style.charAt(0).toUpperCase() + style.slice(1);
  const color = "var(--viz".concat(style);
  return color;
}

class Drinklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: this.props.drinks,
      showRecipe: false,
    };
    this.printDrinks = this.printDrinks.bind(this);
  }

  printDrinks() {
    const drinks = this.props.drinks;
    if (drinks.length === 0) {
      return <p id="noResults">Sorry, no drinks match your results</p>;
    } else {
      const listItems = drinks.map(drink => (
        <li id="drinkname" key={drinks.indexOf(drink).toString()}>
          <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
            <circle id="glass" cx="50%" cy="50%" r="7" fill={getColor(drink)} />
          </svg>
          {drink.Name}
          <span id="ingreds">{pullIngreds(drink.Recipe)}</span>
          <Recipe drinks={drinks} drink={drink.Name} />
        </li>
      ));
      return <ul className="results">{listItems}</ul>;
    }
  }
  componentDidUpdate(prevProps) {
    if (this.state.drinks !== prevProps.drinks) {
      this.setState({ drinks: this.props.drinks });
    }
  }
  render() {
    return this.printDrinks();
  }
}

export default Drinklist;

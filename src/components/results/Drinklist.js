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
  const color = "var(--viz".concat(style).concat(")");
  console.log(color);
  return color;
}

class Drinklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRecipe: false,
    };
    this.printDrinks = this.printDrinks.bind(this);
  }

  printDrinks() {
    // prints drink names with full recipes and other data
    const allDrinks = this.props.allDrinks.Drinks;
    const picks = this.props.picks.Names;

    if (picks.length === 0) {
      return <p id="noResults">Sorry, no drinks match your results</p>;
    } else {
      const listItems = picks.map(drink => (
        <li key={picks.indexOf(drink).toString()}>
          <div className="drinkWrapper">
            <div className="glass">
              <svg width="35" height="40" xmlns="http://www.w3.org/2000/svg">
                <rect
                  id="glass"
                  width="100%"
                  height="100%"
                  rx="2"
                  fill={getColor(allDrinks[drink])}
                />
              </svg>
              <span id="glassStyle">{allDrinks[drink].Data.Style}</span>
            </div>
            <div className="nameData">
              <span id="drinkName">{drink}</span>
              <span id="ingreds">{pullIngreds(allDrinks[drink].Recipe)}</span>
              <div className="metrics">
                <p>
                  {Math.round(allDrinks[drink].Data.ABV * 100, 1)}% alcohol by
                  volume |{" "}
                  {Math.round(
                    allDrinks[drink].Data.Sweetness * 100,
                    1,
                  ).toString()}
                  % sweet | {Math.ceil(allDrinks[drink].Data.Volume).toString()}{" "}
                  ounces
                </p>
              </div>
            </div>
            <Recipe allDrinks={allDrinks} drink={allDrinks[drink]} />
          </div>
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

// Drinklist, list of drinks returned by search form, rendered in html

import React, { Component } from "react";
import Recipe from "./Recipe";

function pullIngreds(obj) {
  let ingredients = [];
  for (let i = 0; i < obj.length; i++) {
    ingredients.push(" " + obj[i]["Ingredient"]);
  }
  ingredients = ingredients.toString();
  return ingredients
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
      const listItems = drinks.map((drink) =>
      <li key={drinks.indexOf(drink).toString()}>
        {drink.Name}
        <span 
          id="ingreds"
        >
          {pullIngreds(drink.Recipe)}
        </span>
          <Recipe 
            drinks={drinks}
            drink={drink.Name}
          />
      </li>
      );
      return (
        <ul className="results">{listItems}</ul>
      );
  }
  componentDidUpdate(prevProps) {
    if (this.state.drinks !== prevProps.drinks) {
      this.setState({drinks: this.props.drinks});
    }
  }
  render() {
    const drinks = this.props.drinks;
    console.log("drinks: ", drinks);
    return this.printDrinks();
  }
}

export default Drinklist;

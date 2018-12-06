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
    };
    this.printDrinks = this.printDrinks.bind(this);
  }

  printDrinks() {
    let drinks = this.props.drinks;
    let listItems = drinks.map((drink) =>
      <li key={drinks.indexOf(drink).toString()}>
        {drink.Name}
        <ul>
          <li id="ingreds">
            {pullIngreds(drink.Recipe)}
            <Recipe drinks={drinks} />
          </li>
        </ul>
      </li>
    );
    return (
      <ul className="results">{listItems}</ul>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.setState({drinks: this.props.drinks});
    }
  }
  render() {
      let drinks = this.state.drinks;
      console.log("drinks: ", drinks)
      return this.printDrinks();
  }
}

export default Drinklist;

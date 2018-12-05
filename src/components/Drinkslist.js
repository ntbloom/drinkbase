import React, { Component } from "react";
import axios from "axios";

function pullIngreds(obj) {
  let ingredients = [];
  for (let i = 0; i < obj.length; i++) {
    ingredients.push(" " + obj[i]["Ingredient"]);
  }
  ingredients = ingredients.toString();
  return ingredients
}

class Drinkslist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: {},
    };
    this.printDrinks = this.printDrinks.bind(this);
  }
  
  printDrinks() {
    const drinks = this.state.drinks;
    const listItems = drinks.map((drink) =>
      <li key={drinks.indexOf(drink).toString()}>
        {drink.Name}
        <ul>
          <li id="ingreds">
            {pullIngreds(drink.Recipe)}
          </li>
        </ul>
      </li>
    );
    return (
      <ul className="results">{listItems}</ul>
    );
  }

  componentDidMount() {
    this.setState({drinks: this.props.drinks}) 
  }
  componentDidUpdate(prevProps) {
    this.setState({drinks: this.props.drinks}) 
  }
  render() {
    return (
      <Drinkslist />
    );
  }
}

export default Drinkslist;

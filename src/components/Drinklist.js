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
      noResults: '',
    };
    this.printDrinks = this.printDrinks.bind(this);
    this.tryAgain = this.tryAgain.bind(this);
    this.showRecipe = this.showRecipe.bind(this);
  }
  
  showRecipe() {
    
  }

  printDrinks() {
    const drinks = this.props.drinks;
    const listItems = drinks.map((drink) =>
      <li key={drinks.indexOf(drink).toString()}>
        {drink.Name}
        <ul>
          <li 
            id="ingreds"
          >
            {pullIngreds(drink.Recipe)}
            <Recipe 
              drinks={drinks}
              drink={drink.Name}
            />
          </li>
        </ul>
      </li>
    );
    return (
      <ul className="results">{listItems}</ul>
    );
  }

  tryAgain() {
    // TODO: bug alert
    // takes 2 form submissions to return no results, except on first
    // render
    const drinks = this.state.drinks;
    if (drinks === undefined || drinks.length === 0) {
      this.setState({noResults: true})
    } else {
      this.setState({noResults: false})
    };
  }
  
  componentDidMount() {
    this.setState({drinks: this.props.drinks});
    this.tryAgain();
  }

  componentDidUpdate(prevProps) {
    if (this.state.drinks !== prevProps.drinks) {
      this.setState({drinks: this.props.drinks});
      this.tryAgain();
    }
  }
  render() {
    const drinks = this.props.drinks;
    const noResults = this.state.noResults;
    console.log("drinks: ", drinks);
    console.log("noResults: ", noResults);
    if (this.state.noResults !== true) {
      return this.printDrinks();
    } else {
      return (
        <p className="nada">:: no results, try again ::</p>
      );
    };
  }
}

export default Drinklist;

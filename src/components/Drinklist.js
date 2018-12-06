import React, { Component } from "react";

function pullIngreds(obj) {
  let ingredients = [];
  for (let i = 0; i < obj.length; i++) {
    ingredients.push(" " + obj[i]["Ingredient"]);
  }
  ingredients = ingredients.toString();
  return ingredients
}

function DrinksList(props) {
  const drinks = props.drinks; //send Drinks
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

class Drinklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: {},
    };
  }
  componentDidMount() {
  
  }
  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
 
    }
  }
  render() {
    return (
      <div>
        <DrinksList />
      </div>
    );
  }
}

export default Drinklist;

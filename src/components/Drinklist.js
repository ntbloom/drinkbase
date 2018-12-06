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
      submitted: '',
    };
  }
  componentDidMount() {
    this.setState({drinks: this.props.drinks}); 
    this.setState({submitted: true});
  }
  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.setState({drinks: this.props.drinks});
    }
  }
  render() {
    if (this.state.submitted === true) {
      let drinks = this.state.drinks;
      return (
        <div>
          <DrinksList drinks={drinks} />
        </div>
      );
    } else {
      return null
    }
  }
}

export default Drinklist;

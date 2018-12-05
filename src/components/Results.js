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

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: {},
      submitted: '',
    };
    this.apiCall = this.apiCall.bind(this);
  }
  apiCall() {
    // calls Python api
    let api = this.props.url;
    let url = api.concat(this.props.query);
    axios.get(url)
      .then(
        response => {
          let drinks = response.data;
          this.setState({drinks: drinks});
          this.setState({submitted: true});
          console.log(this.state.drinks);
        }
      );
  }
  componentDidMount() {
    this.apiCall();
  }
  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.apiCall();
    }
  }
  render() {
    if (this.state.submitted === true) {
      let drinks = this.state.drinks.Drinks;
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

export default Results;

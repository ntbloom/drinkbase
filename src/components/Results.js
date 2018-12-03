import React, { Component } from "react";
import axios from "axios";
import Recipes from "./Recipes";

function getNames(array) {
  // returns simple array of drink names
  let names = [];
  for (let i=0; i<array.Drinks.length; i++) {
    names.push(array.Drinks[i].Name);
  }
  return names;
}


class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: {},
      names: [],
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
          let names = getNames(drinks);
          this.setState({names: names});
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
    var drinkObj = this.state.drinks;
    var namesList = this.state.names.map(function(name, index){
      //return <li key={index}>{name}</li>
      return (
        React.createElement(
          "div",
          null,
          React.createElement(
            "li",
            { key: index },
            name
          ),
          React.createElement(
            Recipes, {name: name}
          )
        )
      )

          
    })
    // TODO: render <Recipes /> for specific ingredients
    return (
      <div className="results">
        <h2>:: try one of these ::</h2>
        <ul>{namesList}</ul>
      </div>
    );
  }
}

export default Results;

/** @format */

// Info, wrapper for rendering individual drink components

import React, { Component } from "react";
import Drink from "./Drink";

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRecipe: false,
    };
    this.printDrinks = this.printDrinks.bind(this);
  }

  printDrinks() {
    // prints drink names with full recipes and other data
    let picks = this.props.picks.Names;
    const drinkList = this.props.drinkList;
    if (picks === undefined) {
      picks = Object.keys(drinkList).sort();
    }

    if (picks.length === 0) {
      return <p id="noResults">Sorry, no drinks match your results</p>;
    } else {
      const pickNames = picks.map(drink => (
        <Drink
          key={drink}
          name={drink}
          allDrinks={drinkList}
          viz={this.props.viz}
        />
      ));
      return <>{pickNames}</>;
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

export default Info;

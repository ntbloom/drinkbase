/** @format */

// searchforms/IndexSearch.js -- conditionally renders Name/Ingredient search

import React, { Component } from "react";
import Namesearch from "./Namesearch";
import Ingredientsearch from "./Ingredientsearch";
import Loading from "../utilities/Loading";

class IndexSearch extends Component {
  render() {
    if (this.props.ingSearch && this.props.vizReady) {
      return <Ingredientsearch 
        viz={this.props.viz} 
        allDrinks={this.props.allDrinks}
        drinkList={this.props.drinkList}
        vizReady={this.props.vizReady}
        />;
    } else if (this.props.nameSearch && this.props.vizReady) {
      return <Namesearch 
        viz={this.props.viz} 
        allDrinks={this.props.allDrinks}
        drinkList={this.props.drinkList}
        vizReady={this.props.vizReady}
      />;
    } else if (this.props.nameSearch || this.props.ingSearch) {
      return <Loading />
    } else {
      return null;
    }
  }
}

export default IndexSearch;

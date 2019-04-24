/** @format */

// searchforms/Index.js -- conditionally renders Name/Ingredient search

import React, { Component } from "react";
import Index from "../results/Index";
import Namesearch from "./Namesearch";
import IngredientSearch from "./Ingredientsearch";

class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Namesearch />
        <Ingredientsearch />
      </div>
    );
  }
}

export default Index;

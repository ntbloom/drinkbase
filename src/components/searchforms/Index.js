/** @format */

// searchforms/Index.js -- conditionally renders Name/Ingredient search

import React, { Component } from "react";
import Namesearch from "./Namesearch";
import Ingredientsearch from "./Ingredientsearch";

class Index extends Component {
  render() {
    if (this.props.ingSearch === true) {
      return <Ingredientsearch />;
    } else if (this.props.nameSearch === true) {
      return <Namesearch />;
    } else {
      return null;
    }
  }
}

export default Index;

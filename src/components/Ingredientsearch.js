/* Ingredientsearch
 * page for searching for drinks by ingredient
 * Results component renders in this frame
 */

import React, { Component } from "react";
import Results from "./Results";

const url = "http://localhost:5000/api/v1.0/ingreds/";

class Ingredientsearch extends Component {
  //TODO: call props and this.state
  //TODO: create forms
  //TODO: format api call

  render() {
    return (
      <div>
        <h2>SEARCH BY INGREDIENT</h2>
        <p>:: enter ingredients you'd like to include in your drinks ::</p>
      </div>
    );
  }
}

export default Ingredientsearch

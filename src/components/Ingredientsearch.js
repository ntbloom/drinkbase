/* Ingredientsearch
 * page for searching for drinks by ingredient
 * Results component renders in this frame
 */

import React, { Component } from "react";
import Results from "./Results";

const url = "http://localhost:5000/api/v1.0/ingreds/";
let query = ""

class Ingredientsearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      included: '',
      excluded: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    console.log("included; ", this.state.included, "| excluded: ", this.state.excluded)
    
    
    let counter = 0;
    if (this.state.included.length > 0) {
      counter += 1;
    }
    if (this.state.excluded.length > 0) {
      counter += 3;
    }
    if (counter === 1) { // only included ingredients
      query = "?incl=" + this.state.included
    } else if (counter === 3) { // only excluded ingredients
      query = "?excl=" + this.state.excluded
    } else if (counter === 4) { // included and excluded ingredients
      query = "?incl=" + this.state.included + "&excl=" + this.state.excluded
    }
    console.log("counter: ", counter, "| query: ", query)
    event.preventDefault(); 
  }
  render() {
      return (
        <div className="namesearchMain">
          <div>
            <h2>SEARCH BY INGREDIENT</h2>
            <p>
              enter ingredient names to retrieve drinks containing only 
              those ingredients. separate multiple ingredients with a
              comma.
            </p>
            <form 
              onSubmit={this.handleSubmit} 
              method="get" 
              className="ingredientSearch">
              <div>
                <label>:: enter ingredients to include ::</label>
                <input 
                  type="text" 
                  name="included" 
                  onChange={this.handleChange}>
                </input>
              </div>
              <div>
                <label>:: enter ingredients to exclude ::</label>
                <input 
                  type="excluded" 
                  name="excluded" 
                  onChange={this.handleChange}>
                </input>
              </div>
              <div>
                <input 
                  type="submit" 
                  value="find drinks">
                </input>
              </div>
            </form>
          <div>
            <Results 
              query={query} 
              url={url}
            />
          </div>
        </div>
      </div>
      );
  }
}


export default Ingredientsearch

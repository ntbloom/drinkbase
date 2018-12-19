/* Ingredientsearch
 * page for searching for drinks by ingredient
 * Results component renders in this frame
 */

import React, { Component } from "react";
import Results from "./Results";

const url = "http://localhost:5000/api/v1.0/ingreds/";

class Ingredientsearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      included: '',
      excluded: '',
      query: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    this.setState({query:
      "?incl=" + this.state.included + "&excl=" + this.state.excluded
    });
    //console.log("query: ", this.state.query)
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
                  onChange={this.handleChange}
                >
                </input>
              </div>
              <div>
                <label>:: enter ingredients to exclude ::</label>
                <input 
                  type="excluded" 
                  name="excluded" 
                  onChange={this.handleChange}
                >
                </input>
              </div>
              <div>
                <input 
                  type="submit" 
                  value="find drinks"
                >
                </input>
              </div>
            </form>
          <div>
            <Results 
              query={this.state.query} 
              url={url}
            />
          </div>
        </div>
      </div>
      );
  }
}


export default Ingredientsearch

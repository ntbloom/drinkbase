/* Ingredientsearch
 * page for searching for drinks by ingredient
 * Results component renders in this frame
 */

import React, { Component } from "react";
import Results from "./Results";

const url = "http://localhost:5000/api/v1.0/ingreds/?incl=";
let query = ""

class Ingredientsearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      included: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    console.log("name: ", event.target.name, "| value: ", event.target.value);
  }
  handleSubmit(event) {
    this.setState({submitted: true})
    
    query = this.state.included;
    event.preventDefault(); 
  }
  render() {
    if (this.state.submitted === true) {
      return (
        <div className="namesearchMain">
          <div>
            <h2>SEARCH BY INGREDIENT</h2>
            <p>
              enter ingredient names to retrieve drinks containing only 
              those ingredients. separate multiple ingredients with a
              comma.
            </p>
            
            
            
            <form onSubmit={this.handleSubmit}>
              <label>
                :: enter an ingredient to include ::
                <input
                  type="text"
                  value={this.state.included}
                  onChange={this.handleChange}
                  placeholder=" ex: rye" />
              </label>
              <input type="submit" value="Submit" />
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
    } else {
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
                <label for="included">:: enter ingredients to include :: </label>
                <input type="text" name="included" onChange={this.handleChange}></input>
              </div>
              <div>
                <label for="excluded">:: enter ingredients to exclude :: </label>
                <input type="excluded" name="excluded" onChange={this.handleChange}></input>
              </div>
              <div>
                <input type="submit" value="find drinks"></input>
              </div>
            </form>

            {/*
            <form onSubmit={this.handleSubmit}>
              <label>
                :: enter an ingredient to include ::
                <input
                  type="text"
                  value={this.state.included}
                  onChange={this.handleChange}
                  placeholder=" ex: vermouth" />
              </label>
              <input type="submit" value="Submit" />
            </form>
            */}

        </div>
      </div>
      );
    }
  }
}


export default Ingredientsearch

/* About component
 * simple static html page
 */

import React, { Component } from "react";
import Ingredientadd from "./Ingredientadd";

class Additions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Name: '',
      Recipe: [],
      Ingredient: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    console.log("state: ", this.state);
  }
  handleSubmit(event) {
    //TODO: populate drink as JSON object
  
  }


  render() {
    return (
      <div>
        <h2>SUGGEST A DRINK</h2>
        <div>
          <div>
            <form
              onSubmit={this.handleSubmit}
              method="post"
              className="suggestForm">
              
              <div>
                <label>:: enter the name of a drink :: </label>
                <div>
                  <input
                    type="text"
                    placeholder=" enter name of the drink"
                    name="Name"
                    onChange={this.handleChange}
                  >
                  </input>
                </div>
              </div>



            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Additions;

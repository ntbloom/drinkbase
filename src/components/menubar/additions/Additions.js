// Additions, add drinks to SQL database with html POST

import React, { Component } from "react";
//import Ingredientadd from "./Ingredientadd";
import Plusminus from "./Plusminus";

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
        <h2>ADD A DRINK TO THE DATABASE</h2>
        <div>
          <div>
            <form
              onSubmit={this.handleSubmit}
              method="post"
              className="suggestForm">
              
              <div>
                <label>enter the name of a drink</label>
                <div>
                  <input
                    type="text"
                    placeholder=" enter name of the drink"
                    name="name"
                    onChange={this.handleChange}
                  >
                  </input>
                </div>
              </div>
            </form>
              
            <div>
              <Plusminus name={this.state.name}/>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default Additions;

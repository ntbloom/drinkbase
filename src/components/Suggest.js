/* About component
 * simple static html page
 */

import React, { Component } from "react";

class Suggest extends Component {
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
                <input
                  type="text"
                  placeholder=" enter name of the drink"
                  name="Name"
                  onChange={this.handleChange}
                >
                </input>
              </div>

              <div>
                <input
                  type="text"
                  placeholder=" enter ingredient name"
                  name="Ingredient"
                  onChange={this.handleChange}
                >
                </input>
                <input
                  type="text"
                  placeholder=" enter amount in decimals"
                  name="Amount"
                  onChange={this.handleChange}
                >
                </input>
                <select
                  name="Unit"
                  onChange={this.handleChange}
                >
                  <option value="oz">oz</option>
                  <option value="dashes">dashes</option>
                  <option value="each">each</option>
                </select>

              </div>


            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Suggest;

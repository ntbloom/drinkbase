/* Namesearch
 * component for searching for drinks by name
 * Results component gets rendered here
 */

import React, { Component } from "react";
import Results from "./Results";

let query = "";
let url = "http://localhost:5000/api/v1.0/names/?name=";

class Namesearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      submitted: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    //console.log("handlechange: ", this.state.value);
  }

  handleSubmit(event) {
    this.setState({submitted: true})
    //console.log("submit: ", this.state.value)
    query = this.state.value
    event.preventDefault(); // why do I need this?
  
  }

  render() {
    //TODO: refactor to make it clean
    if (this.state.submitted === true) {
      //console.log("query at render: ", query);
      return (
        <div className="namesearchMain">
          <div>
            <h2>SEARCH BY DRINK NAME</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              :: enter the name of a drink ::
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder=" ex: martinez" />
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
            <h2>SEARCH BY DRINK NAME</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              :: enter the name of a drink ::
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder=" ex: martinez" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
      );
    }
  }
}

export default Namesearch;

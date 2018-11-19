/* Namesearch
 * component for searching for drinks by name
 * Results component gets rendered here
 */

import React, { Component } from "react";
//import Results from "./Results";

class Namesearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      drinks: {},
      things: [] 
    };
    this.handleChange = this.handleChange.bind(this);
    this.apiCall = this.apiCall.bind(this);
  }

  

  handleChange(event) {
    // required for modifying form data
    this.setState({value: event.target.value});
  }

  apiCall(event) {
    var xhr = new XMLHttpRequest();
    var apiResponse = {'blah':'blah'};
    var url = "http://localhost:5000/api/v1.0/names/?name=";
    xhr.open("GET", url.concat(this.state.value), true);
    xhr.send();
    xhr.onload = function(e) {
      if (xhr.status === 200) {
        apiResponse = JSON.parse(xhr.response)
        console.log('xhr200', xhr.status, apiResponse)
      } else {
        apiResponse = xhr.statusText
        console.error(xhr.statusText)
      }
    }
  }
 
    console.log('componentDidUpdateTHIS', this.state.value);
    console.log('componentDidUpdateDRINKS', this.state.drinks);

  render() {
    return (
      <div className="namesearchMain">
        <div>
          <h2>SEARCH BY DRINK NAME</h2>
        <form onSubmit={this.apiCall}>
          <label>
            :: enter the name of a drink ::
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.value}
              placeholder=" ex: martinez" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
    );
  }
}

export default Namesearch;

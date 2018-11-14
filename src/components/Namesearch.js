/* Namesearch
 * component for searching for drinks by name
 * Results component gets rendered here
 */

import React, { Component } from "react";

class Namesearch extends Component {
  render() {
    return (
      <div>
        <h2>SEARCH BY DRINK NAME</h2>
        <p>:: enter the name of a drink to get the recipe :: </p>
        <ol>
          <li>form coming soon...</li>
        </ol>      
      </div>,
      <Nameform /> // how to refer to components inside others
    );
  }
}

var url = "localhost:5000/api/v1.0/names/?name=";
class Nameform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  

  //TODO: define api call 

  handleSubmit(event) {
    console.log(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="searchForm">
        <form onSubmit={this.handleSubmit}>
          <label>
            :: enter the name of a drink ::
            <input 
              type="text" 
              onChange={this.handleChange}
              value={this.state.value}
              placeholder=" ex: martinez"/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      );
    }
  }
export default Namesearch;

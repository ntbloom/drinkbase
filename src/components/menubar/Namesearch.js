// Namesearch, search for drinks by name, passes drinks to Results

import React, { Component } from "react";
import Results from "./results/Results";

const url = "http://localhost:5000/api/v1.0/names/?name=";

class Namesearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      query: '',
      submitted: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  render() {
    return (
      <div className="namesearchMain">
          <h2>SEARCH BY DRINK NAME</h2>
        <form>
          <label>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder=" start typing to find drinks" />
          </label>
        </form>
          <Results 
            query={this.state.value} 
            url={url}
          />
      </div>
    );
  }
}

export default Namesearch;

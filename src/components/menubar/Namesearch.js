/** @format */

// Namesearch, search for drinks by name, passes drinks to Results

import React, { Component } from "react";
import Index from "./results/Index";

const url = "http://165.227.142.105:5000/api/v1.0/names/?name=";

class Namesearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.setState({ submitted: true });
  }

  render() {
    return (
      <div className="namesearchMain">
        <form>
          <label>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder=" start typing to find drinks"
            />
          </label>
        </form>
        <Index
          query={this.state.value}
          url={url}
          submitted={this.state.submitted}
        />
      </div>
    );
  }
}

export default Namesearch;

/** @format */

// Namesearch, search for drinks by name, passes drinks to Results

import React, { Component } from "react";
import Results from "../results/Results";

const url = "http://165.227.142.105:5000/api/v1.1/names/?name=";

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
      <div className="indexSearch">
        <div className="searchForms">
          <p>
            <i>Hint: start typing drink names</i>
          </p>
          <form>
            <label>
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder=" drink name"
              />
            </label>
          </form>
        </div>
        <Results
          query={this.state.value}
          url={url}
          submitted={this.state.submitted}
          viz={this.props.viz}
          allDrinks={this.props.allDrinks}
          drinkList={this.props.drinkList}
          vizReady={this.props.vizReady}
        />
      </div>
    );
  }
}

export default Namesearch;

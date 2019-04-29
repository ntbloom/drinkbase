/** @format */

// Ingredientsearch.js -- search for drinks by ingredient

import React, { Component } from "react";
import Index from "../results/Index";

const url = "http://165.227.142.105:5000/api/v1.0/ingreds/";

class Ingredientsearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      included: "",
      excluded: "",
      query: "",
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    this.setState({
      query: "?incl=" + this.state.included + "&excl=" + this.state.excluded,
      submitted: true,
    });
    //console.log("query: ", this.state.query)
    event.preventDefault();
  }
  reset() {
    this.setState({ submitted: false });
  }

  render() {
    return (
      <div className="searchforms">
        <div>
          <form
            onSubmit={this.handleSubmit}
            method="get"
            className="ingredientSearch"
          >
            <div>
              <input
                type="text"
                placeholder="included ingredients"
                name="included"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                type="excluded"
                placeholder="excluded ingredients"
                name="excluded"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input type="submit" value="find drinks" />
              <input type="reset" value="start over" onClick={this.reset} />
            </div>
          </form>
          <div>
            <Index
              query={this.state.query}
              url={url}
              submitted={this.state.submitted}
              viz={this.props.viz}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Ingredientsearch;

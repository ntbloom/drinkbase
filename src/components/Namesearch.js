/* Namesearch
 * component for searching for drinks by name
 * Results component gets rendered here
 */

import React, { Component } from "react";
import Results from "./Results";

class Namesearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      query: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // required for modifying form data
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    // TODO: make handleSubmit render the <Results />
    // TODO: Results gets query terms from Namesearch
    // TODO: use componentDidMount() when Results gets called
    // TODO: Results runs the API query 



    console.log("handleSubmit, value : ", this.state.value);
    console.log("handleSubmit, query : ", this.state.query);
 }

  render() {
    return (
      <div className="namesearchMain">
        <div>
          <h2>SEARCH BY DRINK NAME</h2>
        <form onSubmit={this.handleSubmit}>
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
        <div>
          <Results drinks={this.state.value} />
        </div>
      </div>
    </div>
    );
  }
}

export default Namesearch;

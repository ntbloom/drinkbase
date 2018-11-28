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
      submitted: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({submitted: true});
    console.log('Namesearch query: ' + this.state.value);
    event.preventDefault(); // why do I need this?
    // TODO: make sure query is getting passed to Results
  
  }

  render() {
    if (this.state.submitted === true) {
      const query = this.state.value;    
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
            <Results query={query}/>
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
          
          <div>
          </div>
        </div>
      </div>
      );
    }
  }
}

export default Namesearch;

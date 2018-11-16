/* Namesearch
 * component for searching for drinks by name
 * Results component gets rendered here
 */

import React, { Component } from "react";
import Nameform from "./Nameform";
import Results from "./Results";


function poopyhead(a) {
  console.log("John's a poopyhead", a);
}

class Namesearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drinks: [],
      things: [] 
    }

    this.apiCall = this.apiCall.bind(this);
  }

  apiCall(a) {
    var thingState = this.state.things;
    thingState.push(a);
    this.setState({
      things: thingState 
    });
    //this.state.things.push(a);
    console.log("poopyhead got", a);
    console.log("things is now", this.state.things);
    //xhr.open()
    //xhr.send();
    //xhr.onload = function(e) {
    // // update this.state.drinks with returned drinks
    //}
  }
  
  render() {
    return (
      <div className="namesearchMain">
        <div>
          <h2>SEARCH BY DRINK NAME</h2>
          <p>:: enter the name of a drink to get the recipe :: </p>
          <ol>
            <li>form coming soon...</li>
          </ol>      
        </div>,
        <Nameform btnPress={this.apiCall} /> 
        <Results drinks={this.state.drinks} things={this.state.things}/>
      </div>
    );
  }
}


export default Namesearch;

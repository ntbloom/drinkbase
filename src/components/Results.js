import React, { Component } from "react";
//import Nameform from "./Nameform";


class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: [],
      things: props.things
    }
  }

  createThing(item) {
    console.log(item);
    return <li key={item}>{item}</li>
  }

  render() {
    console.log("state things", this.state.things);
    var things = this.state.things.map(this.createThing);
    console.log("thin", things);
  
    return (
      <div>
        <h2>TRY ONE OF THESE</h2>
        <ul>
          {things}
        </ul>
      </div>
    );
  }
}

export default Results;

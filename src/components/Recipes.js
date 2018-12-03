import React, { Component } from "react";

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
    };
  }
  componentDidMount() {
    // TODO: populate
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      // TODO: populate
    }
  }
  render() {
    // TODO: populate
    return (
      <div className="recipes">
        <p>this is where the ingredients will go</p>
      </div>
    );
  }
}

export default Recipes;

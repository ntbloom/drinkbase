import React, { Component } from "react";

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingreds: '',
      recipe: '',
    };
    //this.ingredsPull = this.ingredsPull.bind(this);
    //this.recipePull = this.recipePull.bind(this);
  }
  
  ingredPull() {
    // TODO: pull just ingredient names, not quantities
  }

  recipePull() {
    let drinks = this.props.drinkObj.Drinks;
    let recipe = drinks;
    return this.state.recipe;
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
        <p>{JSON.stringify(this.state.drinkObj)}</p>
      </div>
    );
  }
}

export default Recipes;

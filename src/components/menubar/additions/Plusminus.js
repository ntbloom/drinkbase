// Plusminus, adds or subtracts ingredientadd rows

import React, { Component } from "react";
import Ingredientadd from "./Ingredientadd";

class Plusminus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      rows: 0,
    };
    this.addRow = this.addRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }
  
  addRow() {
    const qty = this.state.rows;
    this.setState({rows: qty + 1})
  }

  deleteRow() {
    const qty = this.state.rows;
    this.setState({rows: qty - 1})
  }

  render() {
    console.log(this.state.rows);
    return (
      <div>
        <form> 
          <button type="submit" onClick={this.addRow}>[+]</button>
          <button type="sumbit" onClick={this.deleteRow}>[-]</button>
        </form>
        <span id="1"><Ingredientadd /></span>
        <span id="2"><Ingredientadd /></span>
        <span id="3"><Ingredientadd /></span>
        <span id="4"><Ingredientadd /></span>
        <span id="5"><Ingredientadd /></span>
        <span id="6"><Ingredientadd /></span>
        <span id="7"><Ingredientadd /></span>
        <span id="8"><Ingredientadd /></span>
      </div>
    );
  }
}

export default Plusminus;

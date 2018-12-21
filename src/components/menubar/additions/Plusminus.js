// Plusminus, adds or subtracts ingredientadd rows

import React, { Component } from "react";

class Plusminus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      rows: 0,
    };
    this.addRow = this.addRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.ingredRow = this.ingredRow.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  addRow() {
    const qty = this.state.rows;
    this.setState({rows: qty + 1})
    
  }

  deleteRow() {
    const qty = this.state.rows;
    if (qty > 0) {
      this.setState({rows: qty - 1})
    }
  }

  ingredRow() {
    let rows = []
    for (let i = 0; i < this.state.rows; i++) {
      rows.push(
        <div>
          <input
            key={"ing" + i}
            type="text"
            placeholder=" ingredient name"
            name="Ingredient"
            onChange={this.handleChange}
          >
          </input>
          <input
            key={"amt" + i}
            type="text"
            placeholder=" amount (decimals)"
            name="Amount"
            onChange={this.handleChange}
          >
          </input>
          <select
            key={"unit" + i}
            name="Unit"
            onChange={this.handleChange}
          >
            <option value="oz">oz</option>
            <option value="dashes">dashes</option>
            <option value="each">each</option>
            <option value="garnish">garnish</option>
          </select>
        </div>
      )
    }
    return <div>{rows}</div>
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    console.log("state: ", this.state);
  }

  render() {
    console.log(this.state.rows);
    return (
      <div>
        <form> 
          <button type="submit" onClick={this.addRow}>[+]</button>
          <button type="sumbit" onClick={this.deleteRow}>[-]</button>
        </form>
        <span>{this.ingredRow()}</span>
      </div>

    );
  }

    /*
  render() {
    console.log(this.state.rows);
    let className = "hidden";
    return (
      <div>
        <form> 
          <button type="submit" onClick={this.addRow}>[+]</button>
          <button type="sumbit" onClick={this.deleteRow}>[-]</button>
        </form>
        <span className={className}><Ingredientadd /></span>
        <span className={className}><Ingredientadd /></span>
        <span className={className}><Ingredientadd /></span>
        <span className={className}><Ingredientadd /></span>
        <span className={className}><Ingredientadd /></span>
        <span className={className}><Ingredientadd /></span>
        <span className={className}><Ingredientadd /></span>
        <span className={className}><Ingredientadd /></span>
        <span className={className}><Ingredientadd /></span>
        <span className={className}><Ingredientadd /></span>
        <span className={className}><Ingredientadd /></span>
      </div>
    );
  }

*/

}

export default Plusminus;

import React, { Component } from "react";
import axios from "axios";

function pullNames(array) {
  // returns simple array of drink names, works in the console
  let names = [];
  for (let i=0; i<array.Drinks.length; i++) {
    names.push(array.Drinks[i].Name);
  }
  return names;
}

class Drinkarray extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
    };
  }

  componentDidMount() {
    //
    var names = pullNames(this.props.drinkObj);
    this.setState({names: names});
    console.log("CDM: ", this.state.names);
  }

  render() {
    // renders unordered list of drink names from simple array
    // working properly
    var namesList = this.state.names.map(function(name, index){
      return <li key={index}>{name}</li>
    })
    return <ul>{ namesList }</ul>
  }
};





class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: {},
    };
  }
  
  componentDidMount() {
    var api = "http://localhost:5000/api/v1.0/names/?name=";
    var url = api.concat(this.props.query);
    axios.get(url)
      .then(res => {
        let drinks = res.data;
        this.setState({drinks});
      }
    );
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      var api = "http://localhost:5000/api/v1.0/names/?name=";
      var url = api.concat(this.props.query);
      axios.get(url)
        .then(res => {
          let drinks = res.data;
          this.setState({drinks});
        }
      );
    }
  }

  render() {
    console.log("results render: ", this.state.drinks);
    var drinkObj = this.state.drinks;
    console.log("results drinkObj: ", drinkObj);
    return (
      <div className="results">
        <h2>:: try one of these ::</h2>
        <h3>{JSON.stringify(drinkObj)}</h3>
        <div>
          {/* 
            Problematic part of the code.  React thinks drinkObj is 
            empty even though in the above h3 it renders properly.
            Delete <Drinkarray /> below and the code works with 
            proper object returned but unformatted html rendering.
          */ }
           <Drinkarray drinkObj={drinkObj} />
        </div>
      </div>
    );
  }
}

        
export default Results;

import React, { Component } from "react";
import axios from "axios";

function pullNames(array) {
  // returns simple array of drink names
  let names = [];
  for (let i=0; i<array.Drinks.length; i++) {
    names.push(array.Drinks[i].Name);
  }
  return names;
}

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: {},
      names: [],
    };
  }
  componentDidMount() {
    var api = this.props.url;
    var url = api.concat(this.props.query);
    axios.get(url)
      .then(res => {
        let drinks = res.data;
        this.setState({drinks: drinks});
        let names = pullNames(drinks);
        this.setState({names: names});
      }
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      var api = this.props.url;
      var url = api.concat(this.props.query);
      axios.get(url)
        .then(res => {
          let drinks = res.data;
          this.setState({drinks: drinks});
          let names = pullNames(drinks);
          this.setState({names: names});
        }
      );
    }
  }
  render() {
    var drinkObj = this.state.drinks;
    var namesList = this.state.names.map(function(name, index){
      return <li key={index}>{name}</li>
    })
    return (
      <div className="results">
        <h2>:: try one of these ::</h2>
        <ul>{namesList}</ul>
      </div>
    );
  }
}

export default Results;

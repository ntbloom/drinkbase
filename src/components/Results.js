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
        console.log("CDM names: ", this.state.names);
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
          console.log("CDU names: ", this.state.names);
        }
      );
    }
  }

  render() {
    console.log("results render: ", this.state.drinks);
    var drinkObj = this.state.drinks;
    console.log("results drinkObj: ", drinkObj);
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

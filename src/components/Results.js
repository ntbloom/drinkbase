import React, { Component } from "react";
//import Namesearch from "./Namesearch";

/*
function apiCall(queryTerms) {
  var xhr = new XMLHttpRequest();
  var apiResponse = {};
  var url = "http://localhost:5000/api/v1.0/names/?name=";
  xhr.open("GET", url.concat(queryTerms), true);
  xhr.send();
  xhr.onload = function(e) {
    if (xhr.status === 200) {
      apiResponse = JSON.parse(xhr.response)
      console.log("xhr200 : ", xhr.status, apiResponse)
    } else {
      apiResponse = xhr.statusText
      console.error("xhrerror : ", xhr.statusText)
    }
  }
  return apiResponse
  console.log("end of API call : ", apiResponse);
};
*/

function holdingPattern(randomData) {
  console.log("holdingPattern query: ", randomData);
  const drinks = 
    {"Name": "Martinez",
      "Recipe": [
            "1.5 oz gin", 
            "1 oz sweet vermouth", 
            "1 tsp Luxardo", 
            "2 dashes Angostura bitters"
        ]
    };
  return drinks
};

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.query,
      drinks: {},
    };
    // console.log("results query : ", this.state.query);
  }
  /*
  componentDidMount() {
    const cocktails = holdingPattern(this.state.query)
    this.setState({drinks: cocktails})
    console.log("didLoad drinks: ", this.state.drinks);
  }
  */

  componentDidMount() {
    var xhr = new XMLHttpRequest()
    var api = "http://localhost:5000/api/v1.0/names/?name=";
    var url = api.concat(this.state.query);
    console.log("url: ", url);
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function() {
      this.setState({drinks: JSON.parse(xhr.response)})
    };
  }
};


  render() {
    console.log("query at render : ", this.state.query);
    console.log("drinks at render : ", this.state.drinks);
    return (
      <div className="results">
        <h2>:: try one of these ::</h2>
        <h3>{JSON.stringify(this.state.drinks)}</h3>
      </div>
    );
  }


export default Results;

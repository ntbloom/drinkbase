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



function apiCall(queryTerms) {
  var xhr = new XMLHttpRequest();
  var apiResponse = {};
  var url= "http://localhost:5000/api/v1.0/names/?name=";
  xhr.open("GET", url.concat(queryTerms));
  xhr.send();
  apiResponse = xhr.response
  console.log("apiCall: ", apiResponse)
  return apiResponse;
}
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
    console.log("results query : ", this.state.query);
    console.log("results at load drinks: ", this.state.drinks);
  }

  componentDidMount() {
    const cocktails = holdingPattern(this.state.query)
    this.setState({drinks: cocktails})
    console.log("didLoad drinks: ", this.state.drinks);
  }
  //this.setState({drinks: apiResponse});
  //componentDidUpdate()?
  
  render() {
    console.log("render this.state.query : ", this.state.query);
    console.log("render this.state.drinks : ", this.state.drinks);
    return (
      <div className="results">
        <h2>:: Try one of these ::</h2>
        <h3>{JSON.stringify(this.state.drinks)}</h3>
      </div>
    );
  }
}

export default Results;

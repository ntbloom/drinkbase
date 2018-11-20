import React, { Component } from "react";
//import Namesearch from "./Namesearch";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //query: this.props.drinks,
      query: "martinez",
      drinks: {}
    };
    console.log("constructor call : ", this.state.query);
    this.apiCall = this.apiCall.bind(this);
  }

  

  apiCall() {
    var xhr = new XMLHttpRequest();
    var apiResponse = {};
    var url = "http://localhost:5000/api/v1.0/names/?name=";
    xhr.open("GET", url.concat(this.state.query), true);
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
    this.setState({drinks: apiResponse});
    console.log("end of API call : ", this.state.drinks);
  }
  
  render() {
    console.log("render this.state.query : ", this.state.query);
  
    return (
      <div>
        <h2>TRY ONE OF THESE</h2>
      </div>
    );
  }
}

export default Results;

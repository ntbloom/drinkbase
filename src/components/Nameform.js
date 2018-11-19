import React, { Component } from "react";

var url = "http://localhost:5000/api/v1.0/names/?name=";

function apiCall(apiURL1, queryTerms) {
  // api call to url concatenated with query terms 
  var xhr = new XMLHttpRequest()
  var apiResponse = {}
  xhr.open("GET", apiURL1.concat(queryTerms), true)
  xhr.send();
  xhr.onload = function(e) {
    if (xhr.status === 200) {
      apiResponse = JSON.parse(xhr.response)
      console.log('xhr200', xhr.status, apiResponse)
    } else {
      apiResponse = xhr.statusText
      console.log('else', apiResponse)
      console.error(xhr.statusText)
    }
  }
  //xhr.onreadystatechange = handler;
  return apiResponse;
}

class Nameform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      drinkBaseCall: {},
      btnPress: props.btnPress
    };
    this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    // required for modifying form data
    this.setState({value: event.target.value});
  }
  
  handleSubmit(event) {
    // response when you hit submit
    console.log('handleSubmit: ', this.state.value);
    //this.btnPress("no state", this.state.value);
    this.state.btnPress(this.state.value);
    this.setState({drinkBaseCall: apiCall(url, this.state.value)})
    event.preventDefault();
  }

  render() {
    return (
      <div className="searchForm">
        <form onSubmit={this.handleSubmit}>
          <label>
            :: enter the name of a drink ::
            <input 
              type="text" 
              onChange={this.handleChange}
              value={this.state.value}
              placeholder=" ex: martinez"/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Nameform;


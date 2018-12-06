// Results, makes api call and passes results to drinklist

import React, { Component } from "react";
import axios from "axios";
import Drinklist from "./Drinklist";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: this.props.drinks,
      submitted: '',
    };
    this.apiCall = this.apiCall.bind(this);
  }
  apiCall() {
    // calls Python api
    let api = this.props.url;
    let url = api.concat(this.props.query);
    axios.get(url)
      .then(
        response => {
          let drinks = response.data;
          this.setState({drinks: drinks});
          this.setState({submitted: true});
          console.log(this.state.drinks);
        }
      );
  }
  componentDidMount() {
    this.apiCall();
  }
  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.apiCall();
    }
  }
  render() {
    if (this.state.submitted === true) {
      let drinks = this.state.drinks.Drinks;
      return (
        <div>
          <Drinklist drinks={drinks} />
        </div>
      );
    } else {
      return null
    }
  }
}

export default Results;

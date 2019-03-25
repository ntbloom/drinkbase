// Results, makes api call and passes results to drinklist

import React, { Component } from "react";
import axios from "axios";
import Drinklist from "./Drinklist";
import Viz from "../Viz";

let url = ''
class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: '',
    };
    this.apiCall = this.apiCall.bind(this);
  }
  apiCall() {
    // calls Python api
    let api = this.props.url;
    url = api.concat(this.props.query);
    //console.log("url", url);
    axios.get(url)
      .then(
        response => {
          const drinks = response.data;
          this.setState({drinks: drinks});
          this.setState({submitted: true});
          ////console.log(this.state.drinks);
        }
      );
  }
  componentDidMount() {
    //console.log("url: ", url);
    this.apiCall();
  }
  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.apiCall();
    }
  }
  render() {
    //console.log("drinks: ", this.state.drinks.Drinks);
    //console.log("query: ", this.props.query);
    if (this.props.query !== '') {
      return (
        <div>
          <Viz drinks={this.state.drinks} />
          <Drinklist drinks={this.state.drinks.Drinks} />
        </div>
      );
    } else {
      return null
      // eslint-disable-next-line
    };
  }
}

export default Results;

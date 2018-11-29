import React, { Component } from "react";
import axios from "axios";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.query,
      drinks: {},
    };
  }
  
  componentDidMount() {
    // TODO: refactor
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
    // TODO: refactor
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
    console.log("query at render : ", this.props.query);
    //console.log("drinks at render : ", this.state.drinks);
    return (
      <div className="results">
        <h2>:: try one of these ::</h2>
        <h3>{JSON.stringify(this.state.drinks)}</h3>
      </div>
    );
  }
}

export default Results;

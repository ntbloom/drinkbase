import React, { Component } from "react";
import axios from "axios";

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
    return (
      <div className="results">
        <h2>:: try one of these ::</h2>
        <h3>{JSON.stringify(this.state.drinks)}</h3>
      </div>
    );
  }
}

export default Results;

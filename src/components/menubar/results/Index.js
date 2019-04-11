import React, { Component } from "react";
import Results from "./Results";

const nameUrl = "http://165.227.142.105:5000/api/v1.0/names/?name=";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vizReady: false,
      allDrinks: {}
    };
    this.getAllDrinks = this.getAllDrinks.bind(this);
  }

  getAllDrinks() {
    //gets all drinks for Viz
    fetch(nameUrl, {credentials: "include"})
      .then(response => {
        return response.json();
      })
      .then(allDrinks => {
        this.setState({allDrinks: allDrinks, vizReady: true});
      })
      .catch(error => {
        console.log("Fetch error in Index.js:", error);
      })
  }

  componentDidMount() {
    this.getAllDrinks();
  }
    
  render() {
    if (this.props.submitted && this.state.vizReady) {
      return (
        <div>
          <Results
            query={this.props.query}
            url={this.props.url}
            allDrinks={this.state.allDrinks}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Index;

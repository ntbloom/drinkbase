import React, { Component } from "react";
import Results from "./Results";

class Index extends Component {

  render() {
    if (this.props.submitted) {
      return (
        <div>
          <Results
            query={this.props.query}
            url={this.props.url}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Index;

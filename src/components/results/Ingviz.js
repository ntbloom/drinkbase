/* @format */

// Ingviz.js -- 3d modeling of individual drinks by their ingredients

import React, { Component } from "react";
import * as d3 from "d3";

class Ingviz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 0.5,
    };
    this.drawIngviz = this.drawIngviz.bind(this);
    this.kill = this.kill.bind(this);
  }

  componentDidMount() {
    this.drawIngviz();
  }

  drawIngviz() {
    // draws SVG chart of individual drink ingredients
    const width = this.props.width * this.state.scale;
    const height = this.props.height * this.state.scale;
    const drink = d3.select("#littleViz");

    // drawing gridlines
  }

  kill() {
    // hides chart from view
    const component = document.getElementById("Ingviz");
    component.style.display = "none";
  }

  render() {
    return (
      <div id="Ingviz">
        <svg
          className="drinkPlot"
          id="littleViz"
          width={this.props.width * this.state.scale}
          height={this.props.height * this.state.scale}
        />
        <div id="ingTooltip" />
        <p onClick={this.kill}>{this.props.name}</p>
      </div>
    );
  }
}

export default Ingviz;

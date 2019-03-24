/* Drinkviz
 * 3d modeling of drinks based on ingredients
 */

import React, { Component } from "react";
import * as d3 from "d3";


class Drinkviz extends Component {
  constructor(props) {
    super(props);
    
    // use state to define any variables that may change, 
    // use const for everything else
    this.state = {
      //need to change to dynamic value
      picks: ["Blood & Sand", "Penicillin", "Scotch Old Fashioned","Scotch Toddy", "Bobby Burns", "Rob Roy", "Rusty Nail"],
    };
    // you need to bind your functions before declarations
    this.drawPlot = this.drawPlot.bind(this);
  }
  
  // gets called on first load
  componentDidMount() {
    this.drawPlot();
  }
  
  // gets called whenever state changes, need to define for other variables
  componentDidUpdate() {
      this.drawPlot();
  }
  
  drawPlot() {
    const node = this.node
    const drinks = this.props.drinks
    const picks = this.state.picks

    d3.select(node)
      .append("line")
      .attr("x1",200)
      .attr("x2",725)
      .attr("y1",300)
      .attr("y2",300)
      .attr("stroke","#888")

    d3.select(node)
      .append("line")
      .attr("x1",462)
      .attr("x2",462)
      .attr("y1",45)
      .attr("y2",560)
      .attr("stroke","#888")

   d3.select(node) 
      .append("text")
      .text("<- (less)        Sugar        (more) ->")
      .attr ("x",462)
      .attr ("y",615)
      .attr ("text-anchor", "middle")
      .attr ("alignment-baseline", "ideographic")
      .style ("fill","#444")
      .style ("font-size","13pt")
      .attr ("opacity", 0.4)
        
    d3.select(node)
      .append("text")
      .text("<- (less)        Alcohol        (more) ->")
      .attr ("x",875)
      .attr ("y",310)
      .attr ("text-anchor", "middle")
      .attr ("alignment-baseline", "ideographic")
      .style ("fill","#444")
      .style ("font-size","13pt")
      .attr ("opacity", 0.4)
      .attr('transform', 'rotate(270 875 295)')
  }        
  
  render() {
    return (
        <svg width="925" height="630"></svg>
    );
  }
}

export default Drinkviz;

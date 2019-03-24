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
      drinks : this.props.drinks,
      //need to change to dynamic value
      picks: ["Blood & Sand", "Penicillin", "Scotch Old Fashioned","Scotch Toddy", "Bobby Burns", "Rob Roy", "Rusty Nail"],
    };
    // you need to bind your functions before declarations
    this.drawPlot = this.drawPlot.bind(this);
    this.getData = this.getData.bind(this);

  }
  // gets called on first load
  componentDidMount() {
    this.getData();
  }
  
  // gets called whenever state changes, need to define for other variables
  componentDidUpdate(prevProps) {
    if (this.props.thePicks !== prevProps.thePicks) {
      this.getData();
    }
  }
  getData() {
    d3.json(this.state.drinks, function(d) {
      drinksJson = d;
      thePicks = this.state.picks;
      this.drawPlot();
    });
  }

  drawPlot() {
    drinksSVG = d3.select('#theDrinks');
    
    drinksSVG.append("line")
                .attr("x1",200)
                .attr("x2",725)
                .attr("y1",300)
                .attr("y2",300)
                .attr("stroke","#888");
    
    drinksSVG.append("line")
                .attr("x1",462)
                .attr("x2",462)
                .attr("y1",45)
                .attr("y2",560)
                .attr("stroke","#888");

    drinksSVG.append("text")
            .text("<- (less)        Sugar        (more) ->")
            .attr ("x",462)
            .attr ("y",615)
            .attr ("text-anchor", "middle")
            .attr ("alignment-baseline", "ideographic")
            .style ("fill","#444")
            .style ("font-size","13pt")
            .attr ("opacity", 0.4);
    
    drinksSVG.append("text")
            .text("<- (less)        Alcohol        (more) ->")
            .attr ("x",875)
            .attr ("y",310)
            .attr ("text-anchor", "middle")
            .attr ("alignment-baseline", "ideographic")
            .style ("fill","#444")
            .style ("font-size","13pt")
            .attr ("opacity", 0.4)
            .attr('transform', 'rotate(270 875 295)');
    
    drinksSVG.selectAll("circle").remove()

    var theOffset = 0;
    
    var abvCirc = drinksSVG.selectAll("#abvCircle")
            .data(drinksJson)
            .enter().append("circle")
            .attr("id", "abvCircle")
            .attr ("stroke-width", function(d) {
                    if (thePicks.includes(d.Name)) {
                        return 0.75
                    } else {
                        return 0.2
                    }
                })
            .attr ("stroke", '#999')
            .attr ("fill-opacity", function(d) {
                    if (thePicks.includes(d.Name)) {
                        return 0.8
                    } else {
                        return 0.1
                    }
                })
            .attr ("cx",function(d) { 
                // TEMPORARY!!!!! trying to debug getting the spacing right
                if (Math.max(30, (d.Data.Sweetness * 4000) - 25) < 100) {
                    console.log("TOO LOW: " + d.Name + " :: " + d.Data.Sweetness + " :: " + Math.max(30, (d.Data.Sweetness * 4000) - 25));
                }
                if (Math.max(30, (d.Data.Sweetness * 4000) - 25) > 800) {
                    console.log("TOO HIGH: " + d.Name + " :: " + d.Data.Sweetness + " :: " + Math.max(30, (d.Data.Sweetness * 4000) - 25));
                }
                // TEMPORARY!!! ^ trying to debug getting the spacing right
                return Math.min(Math.max(30, (d.Data.Sweetness * 1600) - 25), 825);
            })
            .attr ("cy",function(d) { 
                return Math.min(Math.max(30, (630 - (d.Data.AlcoholUnits * 400))), 570);
            })
            .attr ("r",function(d) { return (d.Data.Volume * Math.min(d.Data.Volume, 3)) + 3; })
            .attr("fill",function(d) { 
                    if (d.Data.Style.includes("stirred")) {
                        return "#a5693d";
                    } else if (d.Data.Style.includes("bubbly")) {
                        return "#fcf5bf";
                    } else if (d.Data.Style.includes("shaken")) {
                        return "#100656";
                        //return "#240ccc";
                    } else if (d.Data.Style.includes("fizz")) {
                        return "#f4e381";
                    } else if (d.Data.Style.includes("swizzle")) {
                        return "#f27552";
                    }    else if (d.Data.Style.includes("built")) {
                        return "#b5390c";
                    } else {
                        return "#bbb";
                    }
                })
          //.on("mouseover", highlight)
          //.on("mouseout", unhighlight)
          //.on("click", fillRecipe);
  }        
  
  render() {
    return (
      <div>
        <svg className="bigPlot" id="theDrinks" width="925" height="630"></svg>
      </div>
    );
  }
}

export default Drinkviz;

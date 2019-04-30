/** @format */

// Drinkviz.js -- 3d modeling of drinks

import React, { Component } from "react";
import * as d3 from "d3";

class Drinkviz extends Component {
  constructor(props) {
    super(props);

    // use state to define any variables that may change,
    // use const for everything else
    this.state = {
      showRecipeCounter: 0,
      width: 600,
      aspectRatio: 2 / 3,
      scale: 1,
    };
    // you need to bind your functions before declarations
    this.drawPlot = this.drawPlot.bind(this);
    this.highlight = this.highlight.bind(this);
    this.unhighlight = this.unhighlight.bind(this);
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
    // getting data, defining variables
    const picks = this.props.picks;
    const allDrinks = this.props.allDrinks;
    const drinksSVG = d3.select("#theDrinks");
    const width = this.state.width * this.state.scale;
    const height = this.state.width * this.state.aspectRatio * this.state.scale;

    // for laying out data
    const originX = width / 2;
    const originY = height / 2;

    // drawing the gridlines and axes
    drinksSVG // x-axis
      .append("line")
      .attr("x1", width * 0.2)
      .attr("x2", width * 0.8)
      .attr("y1", height * 0.5)
      .attr("y2", height * 0.5)
      .attr("stroke", "var(--vizLines)");
    drinksSVG // y-axis
      .append("line")
      .attr("x1", width * 0.5)
      .attr("x2", width * 0.5)
      .attr("y1", height * 0.1)
      .attr("y2", height * 0.9)
      .attr("stroke", "var(--vizLines)");
    drinksSVG // x-axis label
      .append("text")
      .text("<- (less)        Sugar        (more) ->")
      .attr("x", width * 0.5)
      .attr("y", height * 0.95)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "ideographic")
      .style("fill", "var(--vizLabels)")
      .style("font-size", "100%")
      .attr("opacity", 0.4);
    drinksSVG // y-axis label
      .append("text")
      .text("<- (less)        Alcohol        (more) ->")
      .attr("x", width * 0.95)
      .attr("y", height * 0.5)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "ideographic")
      .style("fill", "var(--vizLabels)")
      .style("font-size", "100%")
      .attr("opacity", 0.4)
      .attr(
        "transform",
        "rotate(270 ".concat(width * 0.946, " ", height * 0.468, ")"),
      );

    drinksSVG.selectAll("circle").remove();

    // highlights drinks returned by search
    drinksSVG
      .selectAll("#abvCircle")
      .data(allDrinks.Drinks)
      .enter()
      .append("circle")
      .attr("id", "abvCircle")

      // circle outlines for selected drinks
      .attr("stroke-width", d => {
        if (picks.includes(d.Name)) {
          return 0.75;
        } else {
          return 0.2;
        }
      })
      // circle opacity
      .attr("stroke", "var(--vizCircleOutline)")
      .attr("fill-opacity", d => {
        if (picks.includes(d.Name)) {
          return 0.8;
        } else {
          return 0.1;
        }
      })

      //TODO: map sweetness from 0 to 1 on x-axis
      //TODO: map alcohol from 0.25 to 1.5 on y-axis

      .attr("cx", function(d) {
        // TEMPORARY!!!!! trying to debug getting the spacing right
        if (Math.max(30, d.Data.Sweetness * 4000 - 25) < 100) {
          //console.log("TOO LOW: " + d.Name + " :: " + d.Data.Sweetness + " :: " + Math.max(30, (d.Data.Sweetness * 4000) - 25));
        }
        if (Math.max(30, d.Data.Sweetness * 4000 - 25) > 800) {
          //console.log("TOO HIGH: " + d.Name + " :: " + d.Data.Sweetness + " :: " + Math.max(30, (d.Data.Sweetness * 4000) - 25));
        }
        // TEMPORARY!!! ^ trying to debug getting the spacing right
        return Math.min(Math.max(30, d.Data.Sweetness * 1600 - 25), 825);
      })
      .attr("cy", function(d) {
        return Math.min(Math.max(30, 630 - d.Data.AlcoholUnits * 400), 570);
      })
      .attr("r", function(d) {
        return d.Data.Volume * Math.min(d.Data.Volume, 3) + 3;
      })

      // colors circles based on drink type
      .attr("fill", d => {
        if (d.Data.Style.includes("stirred")) {
          return "#a5693d";
        } else if (d.Data.Style.includes("bubbly")) {
          return "var(--vizBubbly)";
        } else if (d.Data.Style.includes("shaken")) {
          return "var(--vizShaken)";
          //return "#240ccc";
        } else if (d.Data.Style.includes("fizz")) {
          return "var(--vizFizz)";
        } else if (d.Data.Style.includes("swizzle")) {
          return "var(--vizSwizzle)";
        } else if (d.Data.Style.includes("built")) {
          return "var(--vizBuilt)";
        } else {
          return "var(--vizDefault)";
        }
      });

    //.on("mouseover", this.highlight())
    //.on("mouseout", this.unhighlight())
  }

  // the tooltip functions
  highlight(d, i) {
    // eslint-disable-next-line
    var circle = d3
      .select(this)
      .attr("fill-opacity", 1)
      .attr("stroke-width", 1.5);

    d3.select("#tooltip")
      .style("left", d3.event.pageX + 5 + "px")
      .style("top", d3.event.pageY - 30 + "px")
      //.text(d.Name)
      .style("visibility", "visible");

    d3.select("#drinkName").text(d.Name);
    d3.select("#drinkStyle").text(d.Data.Style);
    d3.select("#drinkIngredients").text(d.Data.IngredientString);
  }

  unhighlight(d, i) {
    // eslint-disable-next-line
    var circle = d3
      .select(this)
      .attr("fill-opacity", function(d) {
        if (this.state.picks.includes(d.Name)) {
          return 0.95;
        } else {
          return 0.05;
        }
      })
      .attr("stroke-width", function(d) {
        if (this.state.picks.includes(d.Name)) {
          return 0.75;
        } else {
          return 0.2;
        }
      });
    d3.select("#tooltip").style("visibility", "hidden");
  }

  render() {
    return (
      <div>
        <div className="thePlot">
          <svg
            className="bigPlot"
            id="theDrinks"
            width={this.state.width * this.state.scale}
            height={
              this.state.width * this.state.aspectRatio * this.state.scale
            }
          />
        </div>
        <div id="tooltip" className="tooltip">
          <span id="drinkName" />
          <br />
          <span id="drinkStyle" />
          <span id="drinkIngredients" />
        </div>
        <div id="recipeBox">
          <p id="recipeTitle">Click on a drink to see the recipe</p>
          <p id="recipeIng" />
          <p id="recipeBody" />
        </div>
      </div>
    );
  }
}

export default Drinkviz;

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
      aspectRatio: 4 / 3,
      scale: 1,
      circSize: 2,

      //TODO: make SQL calculate these values
      maxSug: 0.82,
      minSug: 0,
      maxAlc: 1.5,
      minAlc: 0.25,
    };
    // you need to bind your functions before declarations
    this.drawAxes = this.drawAxes.bind(this);
    this.drawPlot = this.drawPlot.bind(this);
    this.highlight = this.highlight.bind(this);
    this.unhighlight = this.unhighlight.bind(this);
  }

  // gets called on first load
  componentDidMount() {
    this.drawAxes();
    this.drawPlot();
  }

  // gets called whenever state changes, need to define for other variables
  componentDidUpdate() {
    this.drawPlot();
  }
  drawAxes() {
    const drinksSVG = d3.select("#theDrinks");
    const width = this.state.width * this.state.scale;
    const height =
      (this.state.width / this.state.aspectRatio) * this.state.scale;

    // drawing the gridlines and axes
    drinksSVG // x-axis
      .append("line")
      .attr("x1", width * 0.1)
      .attr("x2", width * 0.9)
      .attr("y1", height - 0.1 * height)
      .attr("y2", height - 0.1 * height)
      .attr("stroke", "var(--vizLines)");
    drinksSVG // y-axis
      .append("line")
      .attr("x1", 0.1 * width)
      .attr("x2", 0.1 * width)
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
      .attr("y", -325)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "ideographic")
      .style("fill", "var(--vizLabels)")
      .style("font-size", "100%")
      .attr("opacity", 0.4)
      .attr(
        "transform",
        "rotate(270 ".concat(width * 0.946, " ", height * 0.468, ")"),
      );
  }

  drawPlot() {
    // getting data, defining variables
    const picks = this.props.picks;
    const allDrinks = this.props.allDrinks;
    const drinksSVG = d3.select("#theDrinks");
    const width = this.state.width * this.state.scale;
    const height =
      (this.state.width / this.state.aspectRatio) * this.state.scale;

    // for laying out data

    drinksSVG.selectAll("circle").remove();

    // highlights drinks returned by search
    const abvCirc = drinksSVG;
    abvCirc
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

      // position circles on chart
      .attr("cx", d => {
        const xScale =
          (this.state.maxSug - this.state.minSug) / this.state.maxSug;
        const leftBuffer = 0.15 * width;
        const rightBuffer = 0.5 * width;
        let sweet = d.Data.Sweetness / this.state.maxSug;
        if (sweet * xScale < 0.1 * width) {
          sweet = sweet * xScale * width + leftBuffer;
        } else if (sweet * xScale > 0.9 * width) {
          sweet = sweet * xScale * width - rightBuffer;
        } else {
          sweet = sweet * xScale * width;
        }
        return sweet;
      })
      .attr("cy", d => {
        const yScale =
          (this.state.maxAlc - this.state.minAlc) / this.state.maxAlc;
        let alcohol = d.Data.AlcoholUnits / this.state.maxAlc;
        alcohol = height - alcohol * yScale * height;
        return alcohol;
      })
      .attr("r", d => {
        let volume = d.Data.Volume;
        volume = volume * this.state.circSize;
        return volume;
      })

      // colors circles based on drink type
      .attr("fill", d => {
        if (d.Data.Style.includes("stirred")) {
          return "#a5693d";
        } else if (d.Data.Style.includes("bubbly")) {
          return "var(--vizBubbly)";
        } else if (d.Data.Style.includes("shaken")) {
          return "var(--vizShaken)";
        } else if (d.Data.Style.includes("double shake")) {
          return "var(--vizDoubleShake)";
        } else if (d.Data.Style.includes("fizz")) {
          return "var(--vizFizz)";
        } else if (d.Data.Style.includes("swizzle")) {
          return "var(--vizSwizzle)";
        } else if (d.Data.Style.includes("built")) {
          return "var(--vizBuilt)";
        } else if (d.Data.Style.includes("hot")) {
          return "var(--vizHot)";
        } else {
          return "var(--vizDefault)";
        }
      })

      .on("mouseover", this.highlight)
      .on("mouseout", this.unhighlight);
  }

  // the tooltip functions
  highlight(d, i) {
    const circle = d3
      // eslint-disable-next-line
      .select(circle)
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
    const circle = d3
      // eslint-disable-next-line
      .select(circle)
      .attr("fill-opacity", d => {
        if (this.state.picks.includes(d.Name)) {
          return 0.98;
        } else {
          return 0.02;
        }
      })
      .attr("stroke-width", d => {
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
              (this.state.width / this.state.aspectRatio) * this.state.scale
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

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
      circSize: 2.5,

      //TODO: make SQL calculate these values
      maxSug: 0.82,
      minSug: 0,
      maxAlc: 1.5,
      minAlc: 0.25,
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

      // position circles on
      .attr("cx", d => {
        const xScale =
          (this.state.maxSug - this.state.minSug) / this.state.maxSug;
        const xBuffer = 0.1 * width;

        let sweet = d.Data.Sweetness / this.state.maxSug;
        if (sweet * xScale < 0.1 * width) {
          sweet = sweet * xScale * width + xBuffer;
        } else if (sweet * xScale > 0.9 * width) {
          sweet = sweet * xScale * width - xBuffer;
        } else {
          sweet = sweet * xScale * width;
        }
        return sweet;
      })
      .attr("cy", d => {
        const yScale =
          (this.state.maxAlc - this.state.minAlc) / this.state.maxAlc;
        let alcohol = d.Data.AlcoholUnits / this.state.maxAlc;
        if (alcohol * yScale > 0.95 * height) {
          alcohol = alcohol * yScale * height;
        } else {
          alcohol = alcohol * yScale * height;
        }
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

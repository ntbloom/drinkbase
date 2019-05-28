/** @format */

// Drinkviz.js -- 3d modeling of drinks

import React, { Component } from "react";
import * as d3 from "d3";

export function cleanID(name) {
  // removes spaces & special chars for dynamic css-friendly IDs
  const nums = {
    1: "One",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
    9: "Nine",
    0: "Zero",
  };
  for (let i = 0; i < 10; i++) {
    const re = new RegExp(i);
    name = name.replace(re, nums[i]);
  }
  // removes special chars
  const id = name.replace(/[^\w]/gi, "");
  return id;
}

class Drinkviz extends Component {
  constructor(props) {
    super(props);

    // use state to define any variables that may change,
    // use const for everything else
    this.state = {
      showRecipeCounter: 0,
      width: window.innerWidth * 0.4,
      aspectRatio: 4 / 3,
      circSize: (window.innerWidth * 0.4) / 300,
    };
    // bind functions to component
    this.getViewport = this.getViewport.bind(this);
    this.calcAxes = this.calcAxes.bind(this);
    this.drawAxes = this.drawAxes.bind(this);
    this.drawPlot = this.drawPlot.bind(this);
    this.highlight = this.highlight.bind(this);
    this.unhighlight = this.unhighlight.bind(this);
  }

  // gets called on first load
  componentDidMount() {
    //this.getViewport();
    console.log("this.state.width:", this.state.width);
    console.log("this.state.circSize:", this.state.circSize);
    this.calcAxes();
    this.drawAxes();
    this.drawPlot();
  }

  // gets called whenever state changes, need to define for other variables
  componentDidUpdate() {
    this.drawPlot();
  }

  getViewport() {
    // sends width and circleSize variables to state
    const width = window.innerWidth * 0.4; // might tweak to get closer to 0.5
    const circSize = width / 200;
    this.setState({ width: width });
    this.setState({ circSize: circSize });
  }

  calcAxes() {
    // sends min and max sugar and alcohol values to setState for graph axes
    const drinks = this.props.allDrinks.Drinks;
    const sug = [];
    const alc = [];
    for (let i = 0; i < drinks.length; i++) {
      sug.push(drinks[i].Data.Sweetness);
      alc.push(drinks[i].Data.AlcoholUnits);
    }
    sug.sort();
    alc.sort();
    this.setState({
      minSug: sug[0],
      maxSug: sug[sug.length - 1],
      minAlc: alc[0],
      maxAlc: alc[alc.length - 1],
    });
  }

  drawAxes() {
    const drinksSVG = d3.select("#theDrinks");
    const width = this.state.width;
    const height = this.state.width / this.state.aspectRatio;
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
      .text("Sugar")
      .attr("x", width * 0.5) // needs adjustment
      .attr("y", height * 0.98) // needs adjustment
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "ideographic")
      .style("fill", "var(--vizLabels)")
      .style("font-size", "100%")
      .attr("opacity", 0.4);
    drinksSVG // y-axis label
      .append("text")
      .text("Alcohol")
      .attr("x", width * 0.95)
      .attr("y", -height / 1.4)
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
    const picks = this.props.picks.Names;
    const allDrinks = this.props.allDrinks;
    const drinksSVG = d3.select("#theDrinks");
    const width = this.state.width;
    const height = this.state.width / this.state.aspectRatio;

    // for laying out data

    drinksSVG.selectAll("circle").remove();

    // highlights drinks returned by search
    const abvCirc = drinksSVG;
    abvCirc
      .selectAll("#abvCircle")
      .data(allDrinks.Drinks)
      .enter()
      .append("circle")
      .attr("id", d => {
        const name = cleanID(d.Name);
        return name;
      })

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
          return 0.5;
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
    const id = document.getElementById(cleanID(d.Name));
    // eslint-disable-next-line
    const circle = d3
      .select(id)
      .attr("fill-opacity", 1)
      .attr("stroke-width", 1.5);

    d3.select("#tooltip")
      .style("left", 25 + "px")
      .style("top", -25 + "px")
      //.text(d.Name)
      //     .style("background-color", fill)
      .style("visibility", "visible");

    d3.select("#drinkName").text(d.Name);
    //d3.select("#drinkStyle").text(d.Data.Style);
    d3.select("#drinkIngredients").text(d.Data.IngredientString);
  }

  unhighlight(d, i) {
    const picks = this.props.picks.Names;
    // eslint-disable-next-line
    const circle = d3
      .select("#".concat(cleanID(d.Name)))
      .attr("fill-opacity", d => {
        if (picks.includes(d.Name)) {
          return 0.7;
        } else {
          return 0.02;
        }
      })
      .attr("stroke-width", d => {
        if (picks.includes(d.Name)) {
          return 0.7;
        } else {
          return 0.2;
        }
      });
    d3.select("#tooltip").style("visibility", "hidden");
  }

  render() {
    return (
      <>
        <>
          <svg
            className="bigPlot"
            id="theDrinks"
            width={this.state.width}
            height={this.state.width / this.state.aspectRatio}
          />
        </>
        <div id="tooltip" className="tooltip">
          <span id="drinkName" />
          <br />
          <span id="drinkStyle" />
          <span id="drinkIngredients" />
        </div>
      </>
    );
  }
}

export default Drinkviz;

/** @format */

// Drink, list of drinks returned by search form, rendered in html

import React, { Component } from "react";
import Recipe from "./Recipe";
import { cleanID } from "./Viz";

function pullIngreds(obj) {
  // converts ingredient object into an array
  let ingredients = [];
  for (let i = 0; i < obj.length; i++) {
    ingredients.push(" " + obj[i]["Ingredient"]);
  }
  ingredients = ingredients.toString();
  return ingredients;
}

class Drink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRecipe: false,
      hover: false,
    };
    this.displayStyle = this.displayStyle.bind(this);
    this.getColor = this.getColor.bind(this);
    this.getOrigStyle = this.getOrigStyle.bind(this);
    this.accentViz = this.accentViz.bind(this);
  }

  componentDidMount() {
    this.getOrigStyle();
  }

  getColor() {
    // dynamically renders colors based on glass
    const drink = this.props.name;
    const allDrinks = this.props.allDrinks;
    let style = allDrinks[drink].Data.Style;
    style = style.charAt(0).toUpperCase() + style.slice(1);
    if (style === "Double shake") {
      style = "DoubleShake";
    }
    const color = "var(--viz".concat(style).concat(")");
    return color;
  }

  getOrigStyle() {
    // stores original styles for drink circles before mouse events
    const circle = document.getElementById(cleanID(this.props.name));
    const origStrokeWidth = circle.style.strokeWidth;
    const origFillOpacity = circle.style.fillOpacity;
    this.setState({
      origStrokeWidth: origStrokeWidth,
      origFillOpacity: origFillOpacity,
    });
  }

  displayStyle() {
    // returns html element with style name
    const drink = this.props.name;
    const allDrinks = this.props.allDrinks;
    const style = allDrinks[drink].Data.Style;
    if (style === "double shake") {
      return "egg white";
    } else {
      return style;
    }
  }

  accentViz() {
    // accents viz elements on mouseover or click
    const circle = document.getElementById(cleanID(this.props.name));
    let bool = 2;
    if (this.state.hover) {
      this.setState({ hover: false });
      bool = 0;
    } else {
      this.setState({
        hover: true,
      });
      bool = 1;
    }
    if (bool === 1) {
      circle.style.strokeWidth = "4";
      circle.style.fillOpacity = "1";
    } else {
      circle.style.strokeWidth = this.state.origStrokeWidth;
      circle.style.fillOpacity = this.state.origFillOpacity;
    }
  }

  render() {
    const name = this.props.name;
    const allDrinks = this.props.allDrinks;
    return (
      <div
        className="drinkWrapper"
        onMouseEnter={this.accentViz}
        onMouseLeave={this.accentViz}
      >
        <div className="glass">
          <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
            <rect
              id="glass"
              width="70%"
              height="80%"
              rx="2"
              fill={this.getColor()}
            />
          </svg>
        </div>
        <div className="nameData">
          <div>{name}</div>
          <div id="ingreds">{pullIngreds(allDrinks[name].Recipe)}</div>
          <div className="metrics">
            <p>
              {Math.ceil(allDrinks[name].Data.Volume).toString()} ounces |
              {"    "}
              {this.displayStyle()} |{"    "}
              {Math.round(allDrinks[name].Data.ABV * 100, 1)}% abv
              {/* 
                  |{"  "}
                  {Math.round(
                    allDrinks[drink].Data.Sweetness * 100,
                    1,
                  ).toString()}
                  % sweet*
                  */}
            </p>
          </div>
        </div>
        <Recipe allDrinks={allDrinks} drink={allDrinks[name]} />
      </div>
    );
  }
}

export default Drink;

/** @format */

// Welcome.js -- First page you see when you get here

import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Ingredientsearch from "../searchforms/Ingredientsearch";
import Namesearch from "../searchforms/Namesearch";
import Buttons from "./Buttons";

class Welcome extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/drinkbase" exact component={Buttons} />
          <Route
            path="/ingredientsearch"
            render={props => (
              <Ingredientsearch
                {...props}
                viz={this.props.viz}
                allDrinks={this.props.allDrinks}
                drinkList={this.props.drinkList}
                vizReady={this.props.vizReady}
              />
            )}
          />
          <Route
            path="/namesearch"
            render={props => (
              <Namesearch
                {...props}
                viz={this.props.viz}
                allDrinks={this.props.allDrinks}
                drinkList={this.props.drinkList}
                vizReady={this.props.vizReady}
              />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default Welcome;

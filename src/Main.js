import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Ingredientsearch from "./Ingredientsearch";
import Namesearch from "./Namesearch";
import drinkViz from "./drinkViz";


class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <img src={ require("./images/drinkBaseWhite.png") } alt="drinkBase" height="150"/>
          <ul className="header">
            <li><NavLink exact to="/Ingredientsearch">search by<br/>ingredient</NavLink></li>
            <li><NavLink to="/Namesearch">search by<br/>drink name</NavLink></li>
            <li><NavLink to="/drinkViz">use<br/>drinkViz</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/Ingredientsearch" component={Ingredientsearch}/>
            <Route path="/Namesearch" component={Namesearch}/>
            <Route path="/drinkViz" component={drinkViz}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;

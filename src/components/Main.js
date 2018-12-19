/* Main
 * component renders nav bar
 * component renders all other components
 * lone component rendered by index.js
 */

import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Ingredientsearch from "./menubar/Ingredientsearch";
import Namesearch from "./menubar/Namesearch";
import Viz from "./menubar/Viz";
import Additions from "./menubar/additions/Additions";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <img 
            src={ require("../images/drinkBaseWhite.png") } 
            alt="drinkBase" 
            height="150"
          />
          <ul className="header">
            <li><NavLink exact to="/Ingredientsearch">search by<br/>ingredient</NavLink></li>
            <li><NavLink to="/Namesearch">search by<br/>drink name</NavLink></li>
            <li><NavLink to="/Viz">use<br/>drinkViz</NavLink></li>
            <li><NavLink to="/Additions">add a<br/>drink</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/Ingredientsearch" component={Ingredientsearch}/>
            <Route path="/Namesearch" component={Namesearch}/>
            <Route path="/Viz" component={Viz}/>
            <Route path="/Additions" component={Additions}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;

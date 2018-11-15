/* Namesearch
 * component for searching for drinks by name
 * Results component gets rendered here
 */

import React, { Component } from "react";
import Nameform from "./Nameform";


class Namesearch extends Component {
  render() {
    return (
      <div>
        <h2>SEARCH BY DRINK NAME</h2>
        <p>:: enter the name of a drink to get the recipe :: </p>
        <ol>
          <li>form coming soon...</li>
        </ol>      
      </div>,
      <Nameform /> // how to refer to components inside others
    );
  }
}


export default Namesearch;

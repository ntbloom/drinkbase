/* About component
 * simple static html page
 */

import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div>
        <h2>ABOUT US</h2>
        <p>:: drinkBase is the premier cocktail finder that leverages
          the power of relational databases to help find the perfect
          beverage for any occasion ::</p>
        <p>for more information about us, check out some of our corporate and 
          nonprofit sponsors</p>
        <ol className="sponsors">
          <li><h3>::  the pour kids ::</h3>a 503(c)(3) organization teaching mixology
            to underserved middle and high school students</li>
          <li><h3>:: the andre-the-giant legal defense fund ::</h3>ensuring that
            drinking a fifth of brandy before dinner will never be a
            crime</li>
          <li><h3>:: soros, koch & koch ::</h3>professional lobbyists
            representing fine spirits industries domestically and abroad</li>
        </ol>
        </div>
    );
  }
}

export default About;

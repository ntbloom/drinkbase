import React, { Component } from "react";

let drinksObj = {
  'Bitter French': [
    '1 oz gin',
    '0.25 oz Campari',
    '0.5 oz lemon juice',
    '0.5 oz simple syrup',
    '2.5 oz champagne'],
  'Blackthorn': [
    '1.5 oz gin',
    '0.75 oz sweet vermouth',
    '0.75 oz sloe gin',
    '2 dashes orange bitters',
    '1 garnish orange twist'],
  'Dark & Stormy': [
    '2 oz dark rum',
    '0.75 oz lime juice',
    '4 oz ginger beer',
    '1 garnish lime wheel']
}

let drinksArr = [
  'Bitter French',
  'Blackthorn',
  'Dark & Stormy']

//logic for rendering html in loops
const drinks = drinksArr.map((drinkName) =>
  <p>{drinkName}</p>
);

class Ingredientsearch extends Component {
  render() {
    return (
      <div>
        <h2>SEARCH BY INGREDIENT</h2>
        <p>:: enter ingredients you'd like to include in your drinks ::</p>
        <ol>
          <li>form coming soon...</li>
        </ol>
      </div>, 
      <p>{drinks}</p> //requires html tags
    );
  }
}

export default Ingredientsearch

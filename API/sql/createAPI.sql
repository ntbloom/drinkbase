/* createAPI.sql -- creates SQL tables for drinkbase API */

--recipes: quantity of ingredients in each drink
DROP TABLE IF EXISTS recipes;
CREATE TABLE recipes (
  name TEXT NOT NULL,
  ingredient TEXT NOT NULL,
  unit TEXT NOT NULL,
  amount REAL NOT NULL,
  PRIMARY KEY(name, ingredient)
  FOREIGN KEY(ingredient) REFERENCES ingredients(ingredient)
  FOREIGN KEY(name) REFERENCES build(name)
);

--ingredients: info on each drink ingredient
DROP TABLE IF EXISTS ingredients;
CREATE TABLE ingredients (
  ingredient TEXT NOT NULL PRIMARY KEY,
  class TEXT NOT NULL,
  alcohol REAL NOT NULL,
  sweetness REAL,
  brightness REAL
);

--build: how to build the drink
DROP TABLE IF EXISTS build; 
CREATE TABLE build (
  name TEXT NOT NULL PRIMARY KEY,
  style TEXT NOT NULL,
  glass TEXT NOT NULL,
  notes BLOB
);

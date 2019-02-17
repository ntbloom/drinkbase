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
  FOREIGN KEY(name) REFERENCES prep(name)
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
--prep: how to build the drink
DROP TABLE IF EXISTS prep; 
CREATE TABLE prep (
  name TEXT NOT NULL PRIMARY KEY,
  style TEXT,
  glass TEXT,
  notes BLOB
);

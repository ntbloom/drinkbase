/* createDB.sql -- creates POSTGRESQL database & tables for drinkbase API */

--TODO: add NOT NULL to everything once data are complete

--transaction block for table creation and database population
BEGIN;

--units: conversion rates for unit to ounces
DROP TABLE IF EXISTS units CASCADE;
CREATE TABLE units (
  unit VARCHAR(40) NOT NULL PRIMARY KEY,
  conversion REAL
);

--style: characteristics of types of drinks
DROP TABLE IF EXISTS style CASCADE;
CREATE TABLE style (
  style VARCHAR(40) NOT NULL PRIMARY KEY,
  melt REAL NOT NULL,
  description TEXT
);

--ingredients: info on each drink ingredient
DROP TABLE IF EXISTS ingredients CASCADE;
CREATE TABLE ingredients (
  ingredient VARCHAR(40) NOT NULL PRIMARY KEY,
  ingClass VARCHAR(40) NOT NULL,
  ingAbv REAL NOT NULL,
  sweetness REAL,
  brightness REAL
);

--prep: how to build the drink
DROP TABLE IF EXISTS prep CASCADE; 
CREATE TABLE prep (
  name VARCHAR(40) NOT NULL PRIMARY KEY,
  style VARCHAR(40) NOT NULL,
  glass VARCHAR(40),
  garnish VARCHAR(40),
  notes TEXT,
  FOREIGN KEY(style) REFERENCES style (style)
);

--recipes: quantity of ingredients in each drink
DROP TABLE IF EXISTS recipes CASCADE;
CREATE TABLE recipes (
  name VARCHAR(40) NOT NULL,
  ingredient VARCHAR(40) NOT NULL,
  unit VARCHAR(40) NOT NULL,
  amount REAL NOT NULL,
  PRIMARY KEY (name, ingredient),
  FOREIGN KEY (ingredient) REFERENCES ingredients (ingredient),
  FOREIGN KEY (name) REFERENCES prep (name),
  FOREIGN KEY (unit) REFERENCES units (unit)
);
--add the data from csv files
\copy units FROM 'data/units.csv' WITH (FORMAT csv, HEADER on);
\copy style FROM 'data/style.csv' WITH (FORMAT csv, HEADER on);
\copy ingredients FROM 'data/ingredients.csv' WITH (FORMAT csv, HEADER on);
\copy prep FROM 'data/prep.csv' WITH (FORMAT csv, HEADER on);
\copy recipes FROM 'data/recipes.csv' WITH (FORMAT csv, HEADER on);


--commit the transaction block
COMMIT;

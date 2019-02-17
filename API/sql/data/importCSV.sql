/* importCSV.sql -- imports data from csv files */

.mode csv
.import ./data/prep.csv prep
.import ./data/ingredients.csv ingredients
.import ./data/recipes.csv recipes

/* importCSV.sql -- imports data from csv files */

.mode csv
.import ./sql/data/prep.csv prep
.import ./sql/data/ingredients.csv ingredients
.import ./sql/data/recipes.csv recipes

/* queries.sql -- calculates sweetness, alcohol_units, brightness of a given drink */

SELECT
  recipes.name,
  SUM(ingredients.sweetness * recipes.amount) AS sweetness,
  SUM(ingredients.ingAbv * recipes.amount) AS alcohol_units,
  SUM(ingredients.brightness * recipes.amount) AS brightness
  --TODO: volume
  
  --TODO: melt
FROM ingredients
INNER JOIN recipes ON ingredients.ingredient = recipes.ingredient
WHERE recipes.name = 'Negroni'
;

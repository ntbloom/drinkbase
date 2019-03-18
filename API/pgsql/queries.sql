/* queries.sql -- calculates sweetness, alcohol_units, brightness of a given drink */

SELECT
  SUM(ingredients.sweetness * recipes.amount) AS sweetness
FROM ingredients
INNER JOIN recipes ON ingredients.ingredient = recipes.ingredient
WHERE recipes.name = 'Margarita'
GROUP BY recipes.name
;

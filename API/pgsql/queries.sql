/* queries.sql -- calculates sweetness, alcohol_units, brightness of a given drink */
/*
SELECT
  recipes.ingredient,
  units.conversion,
  (units.conversion * ingredients.brightness) as brightness
FROM recipes 
INNER JOIN units ON recipes.unit = units.unit
INNER JOIN ingredients ON recipes.ingredient = ingredients.ingredient
WHERE recipes.name = 'Martinez'
GROUP BY recipes.ingredient, recipes.amount, units.conversion, ingredients.brightness
;

SELECT
  SUM(recipes.amount * units.conversion) * (1.0 + style.melt)
FROM recipes
INNER JOIN units ON recipes.unit = units.unit
INNER JOIN prep ON recipes.name = prep.name
INNER JOIN style ON prep.style = style.style
WHERE recipes.name = 'Martinez'
GROUP BY recipes.amount, style.melt
;
*/

SELECT
  SUM(recipes.amount * units.conversion * (1.0 + style.melt))
FROM recipes
INNER JOIN units ON recipes.unit = units.unit
INNER JOIN prep ON recipes.name = prep.name
INNER JOIN style ON prep.style = style.style
WHERE recipes.name = 'Martinez'
GROUP BY recipes.name
;

/* volume.sql -- calculates volume for a given drink */
SELECT
  SUM(recipes.amount * units.conversion * (1.0 + style.melt)) AS volume,
  recipes.name
FROM recipes
INNER JOIN units ON recipes.unit = units.unit
INNER JOIN prep ON recipes.name = prep.name
INNER JOIN style ON prep.style = style.style
GROUP BY recipes.name
ORDER BY recipes.name 
;

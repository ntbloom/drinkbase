/* build.sql -- query for selecting build instructions for given drink */

SELECT 
  (SELECT regexp_replace(
    (SELECT style.description FROM style WHERE style.style = prep.style),
    '@',
    prep.glass))
FROM prep
INNER JOIN style on prep.style = style.style
WHERE prep.name = 'Cricket Ball' 
;

SELECT 
  CASE WHEN prep.garnish = 'none'
    THEN ' No garnish.'
  ELSE ' Garnish with ' || prep.garnish || '.'
  END
  FROM prep
  WHERE prep.name = 'Cricket Ball'
;

# drinkViz TO DO

Noah, do these things:

## build data thing that feeds drinkViz

~~1) load the prep and chemistry tables into sqlite
    - rename your "ingredient" table to "recipe"
    - rename chemistry.acid to chemistry.brightness (then quit being a dick)~~

2) rewrite the R script in python
    - at the end it writes out two csv's
        - the only difference is that one is filtered to be only drinks that have a "style" filled in. This was a hack. No need for that.
    - instead you need to return it as json, so you can pass it through the api

3) make it so that, upon load, it builds the all_drinks json and feeds the whole thing to the site

4) figure out the filtering thing
    - make it so that, every time you return drinks (from drink name or ingredient search) it returns something that I can use to filter the plot (i.e. dim the non-selected drinks)





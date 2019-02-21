# drinkViz TO DO

Noah, do these things:

## build data thing that feeds drinkViz

(done)~~load the prep and chemistry tables into sqlite
    - rename your "ingredient" table to "recipe"
    - rename chemistry.acid to chemistry.brightness (then quit being a dick)

**1) Seth to fill in missing gaps in ingredients csv file.  Looking for sweetness and brightness values for every possible ingredient. Double check all current zero values.  Ideally, only water should have values of 0 for sweetness and brightness.**

(done) ~~2) rewrite the R script in python
    - at the end it writes out two csv's
        - the only difference is that one is filtered to be only drinks that have a "style" filled in. This was a hack. No need for that.
    - instead you need to return it as json, so you can pass it through the api

(done)~~3) make it so that, upon load, it builds the all_drinks json and feeds the whole thing to the site

4) figure out the filtering thing
    - make it so that, every time you return drinks (from drink name or ingredient search) it returns something that I can use to filter the plot (i.e. dim the non-selected drinks)





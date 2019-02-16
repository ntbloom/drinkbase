/* createAPI.sql -- creates SQL tables for drinkbase API */

/*TODO: create table recipes if not exists
name blob
ingredients blob
unit blob
amount real
primary key (name, ingredients)
foreign key ingred (chemistry.ingredient)
foreign key name (prep.name)

--TODO: create table chemistry if not exists
ingredients blob
class blob
abv float
sugar float
brightness float
primary key (ingredients)

--TODO: create table prep if not exists
name blob
style blob
glass blob
notes blob

/* notes:
chemistry.class = sweetener, juice, base,etc 
prep.style = stirred, shaken, bubbly, built, eggs, etc.

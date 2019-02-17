## How to init SQLite database

run createDB.sh script located in drinkBase/API/sql directory to
automatically create and populate drinkBase.db file wth data from CSV
files

## How to query the drinkbase API

### Ingredient Searches
For ingredient searches, use:

incl = included ingredients</br>
excl = excluded ingredients

```http://localhost:5000/api/v1.0/ingreds/?incl=[query terms]&excl=[query terms]```

Separate multiple ingredients with a comma:</br>
```http://localhost:5000/api/v1.0/ingreds/?incl=rye,vermouth&excl=bitters,lemon```

### Name Searches
For name searches, use:</br>
name = name of the drink you're searching for

```http://localhost:5000/api/v1.0/names/?name=[query terms]```

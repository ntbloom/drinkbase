# Using the drinkbase API

## Init the SQLite database

run createDB.sh script located in ```drinkBase/API/sql/``` to
automatically create and populate drinkBase.db file wth data from CSV
files

## Query the API

### Ingredient Searches
For ingredient searches, use:

incl = included ingredients
excl = excluded ingredients

```http://[domain]/api/v1.0/ingreds/?incl=[query terms]&excl=[query terms]```

Separate multiple ingredients with a comma:</br>
```http://[domain]/api/v1.0/ingreds/?incl=rye,vermouth&excl=bitters,lemon```

### Name Searches
For name searches, use:
name = name of the drink you're searching for

```http://[domain]/api/v1.0/names/?name=[query terms]```

Note: domain defaults to ```localhost:5000``` during development

# Using the drinkbase API

</br>

## Query the API

### Ingredient Searches

For ingredient searches, use:

`incl` = included ingredients

`excl` = excluded ingredients

`http://[domain]/api/v1.0/ingreds/?incl=[query terms]&excl=[query terms]`

Separate multiple ingredients with a comma:

`http://[domain]/api/v1.0/ingreds/?incl=rye,vermouth&excl=bitters,lemon`

</br>

### Name Searches

For name searches, use:</br> `name` = name of the drink you're searching for

`http://[domain]/api/v1.0/names/?name=[query terms]`

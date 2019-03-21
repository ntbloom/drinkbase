# Using the drinkbase API

</br>

## Postgresql Back-end

### Init the database

run createPGSQL.sh script to automatically create and populate database from
csv

### Manually query the database

Switch to postgres in terminal, open interactive client:
```
sudo su - postgres
psql    # opens interactive postgresql client
```
</br>

Create local user in `psql` client (make sure username matches results of
`whoami`):
```
CREATE ROLE [username] createdb; 
SET client_min_messages = WARNING;  /* less verbose output, necessary for
build scripts */
\q    /* exits psql client */
```
</br>

Exit postgres from bash:
```
exit
```
</br>

Pipe sql scripts to `psql` to run manual queries:
```
psql drinkbase < sample_query.sql
```
Or launch interactive terminal:
```
psql drinkbase
```
</br>

## Query the API


### Ingredient Searches
For ingredient searches, use:

```incl``` = included ingredients</br>
```excl``` = excluded ingredients

```http://[domain]/api/v1.0/ingreds/?incl=[query terms]&excl=[query terms]```

Separate multiple ingredients with a comma:</br>
```http://[domain]/api/v1.0/ingreds/?incl=rye,vermouth&excl=bitters,lemon```

</br>

### Name Searches
For name searches, use:</br>
```name``` = name of the drink you're searching for

```http://[domain]/api/v1.0/names/?name=[query terms]```

Note: domain defaults to ```localhost:5000``` during development


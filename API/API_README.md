# Using the drinkbase API

</br>

## Postgresql Back-end

### Init the database (see postgresql.org/docs for further help)

Install Postgresql on your box. User 'postgres' should be created
automatically.

Packages needed on Fedora:
postgresql postgresql-server postgresql-dev postgresql-contrib

Switch to user 'postgres' and initialize database:

```
sudo su - postgres
initdb
psql    # opens interactive postgresql client
```
</br>

Create local user in `psql` client (make sure username matches results of
`whoami` in terminal):
```
CREATE ROLE [username] createdb login createdb;
ALTER ROLE [username] SET client_min_messages = WARNING;
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


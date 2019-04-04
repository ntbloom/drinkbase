#!/bin/bash
## createDB.sh -- automatically creates and populates database from CSV
set -e
SOURCEDIR=./pgsql
DATABASE="drinkbase"

printf "Building postgresql database...\n\n"

if [ -e error_log.txt ]
then
  rm error_log.txt
fi

# psql command
dropdb --if-exists drinkbase
createdb drinkbase

# executes sql create table comments
cat $SOURCEDIR/createDB.sql 2>> error_log.txt | psql -bq $DATABASE 2>> error_log.txt
if [ -s error_log.txt ]
then
  printf "ERROR: DATABASE CREATION ABORTED\nCheck error_log.txt for further info\n\n"
  dropdb --if-exists drinkbase
else
  rm error_log.txt
  printf "Succesfully created tables for postgresql database \"$DATABASE\"\n\n"
  printf "To access interactive terminal, enter \"psql $DATABASE\" in command prompt\n\n"
fi 

printf "Exiting postgresql build script...\n\n"


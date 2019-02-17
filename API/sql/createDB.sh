#!/bin/bash
## createDB.sh -- automatically creates and populates database from CSV
DESTDIR=.

if [ -e $DESTDIR/drinkBase.db ]
then
  printf "ERROR: $DESTDIR/drinkBase.db already exists\n"
  printf "Existing file must be manually deleted\n"
  printf "Exiting script...\n"
  
  exit 1
else
  touch $DESTDIR/drinkBase.db
  echo "created $DESTDIR/drinkBase.db"
fi

cat data/createTables.sql | sqlite3 $DESTDIR/drinkBase.db 2> error_log.txt
if [ -s error_log.txt ]
then
  printf "ERROR: table creation failed, check error_log.txt for info\n"
  rm $DESTDIR/drinkBase.db
  exit 1
else
  rm error_log.txt
  printf "Succesfully created tables in $DESTDIR/drinkBase.db\n"
fi 
cat data/importCSV.sql | sqlite3 $DESTDIR/drinkBase.db 2> error_log.txt
if [ -s error_log.txt ]
then
  printf "ERROR: CSV import failed, check error_log.txt for info\n"
  rm $DESTDIR/drinkBase.db
  exit 1
else
  rm error_log.txt 
  printf "Succesfully imported data from CSVs into $DESTDIR/drinkBase.db\n"
fi 

printf "\n$DESTDIR/drinkBase.db ready for use\nExiting script...\n"

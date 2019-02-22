#!/bin/bash
## createDB.sh -- automatically creates and populates database from CSV
DESTDIR=../drinkStore
SOURCEDIR=./data

function yes_or_no {
  while true; do
    read -p "$* [y/n]: " yn
    case $yn in
      [Yy]*) return 0 ;;
      [Nn]*) printf "Build failed, exiting...\n"; exit 1;;
    esac
  done
}

printf "Starting build script...\n\n"
if [ -e $DESTDIR/drinkBase.db ]
then
  RM_WARNING="drinkBase.db already exists, do you wish to overwrite?"
  yes_or_no "$RM_WARNING"
fi
touch $DESTDIR/drinkBase.db
printf "created $DESTDIR/drinkBase.db\n"

if [ -e error_log.txt ]
then
  rm error_log.txt
fi

cat $SOURCEDIR/createTables.sql | sqlite3 $DESTDIR/drinkBase.db 2> error_log.txt
if [ -s error_log.txt ]
then
  printf "ERROR: table creation failed, check error_log.txt for info\n"
  rm $DESTDIR/drinkBase.db
  exit 1
else
  rm error_log.txt
  printf "Succesfully created tables in $DESTDIR/drinkBase.db\n"
fi 
cat $SOURCEDIR/importCSV.sql | sqlite3 $DESTDIR/drinkBase.db 2> error_log.txt
if [ -s error_log.txt ]
then
  printf "ERROR: CSV import failed, check error_log.txt for info\n"
  rm $DESTDIR/drinkBase.db
  exit 1
else
  rm error_log.txt 
  printf "Succesfully imported data from CSVs into $DESTDIR/drinkBase.db\n"
fi 

printf "\n$DESTDIR/drinkBase.db ready for use\n\nExiting script...\n"

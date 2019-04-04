#!/bin/bash
## mkvenv.sh -- automatically creates python virtual environment

printf "Building python3 virtual environments...\n\n"

set -e
SOURCEDIR=./python/
DESTDIR=../../API/
VENV="drinkEnv"

# check for existing venv, delete if necessary 
if [ -d $DESTDIR/$VENV ]; then
  rm -rf $DESTDIR/$VENV
fi

# creates and activates virtual environment
python3 -m venv $DESTDIR/$VENV
source $DESTDIR/$VENV/bin/activate
pip3 install -r $SOURCEDIR/requirements.txt

printf "\nSuccess...\nExiting python3 venv build script...\n\n"

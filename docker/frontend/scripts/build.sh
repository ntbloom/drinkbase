#!/bin/bash

set -x
set -e

CODE_SRC=/drinkbase
CODE_DEST=/usr/share/nginx/html

cp -R -v $CODE_SRC/* $CODE_DEST

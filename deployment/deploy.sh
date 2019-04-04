#!/bin/bash
## deploy.sh -- automatically deploy drinkbase

set -e
printf "Starting master build script...\n\n"

# postgresql
./pgsql/createPGSQL.sh

# python3-venv
./python/mkvenv.sh

printf "Success!\n\nExiting master build script...\n"

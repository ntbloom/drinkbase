#!/bin/bash
## deploy.sh -- automatically deploy drinkbase

# postgresql
./pgsql/createPGSQL.sh

# python3-venv
./python/mkvenv.sh

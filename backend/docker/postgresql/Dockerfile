# Dockerfile for postgresql image
FROM postgresql:12

ENV POSTGRES_PASSWORD=password

COPY data ./


RUN initdb drinkbase
RUN usr/bin/psql d drinkbase -f ./init_database.sql

CMD psql -c "SELECT * FROM ingredients;"

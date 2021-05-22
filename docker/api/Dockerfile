# Dockerfile for python/flask/gunicorn API service

FROM python:3.9-slim-buster


# install dependencies
RUN apt-get update && apt-get install --no-install-recommends -y \
  unattended-upgrades

COPY ./backend/ /home/debian/

WORKDIR /home/debian/
RUN python3 -m pip install poetry
RUN poetry install

# launch the gunicorn service
# TODO: find out how to do this more elegantly than waiting 10 seconds
# TODO: find out how to show logging
WORKDIR /home/debian/src
CMD sleep 10 && \
  poetry run gunicorn \
  -w 4 \
  -b localhost:8080 app:app \
  --access-logfile /var/log/gunicorn.log \

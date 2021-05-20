FROM python:3.9-slim-buster


# install dependencies
RUN apt-get update && apt-get install --no-install-recommends -y \
  curl \
  apache2 \
  libapache2-mod-wsgi-py3 \
  python3-certbot-apache 


COPY ./backend/ /home/debian/
COPY ./docker/api/conf/ports.conf /etc/apache2/
#COPY ./docker/api/conf/apache2.conf /etc/apache2/
COPY ./docker/api/conf/drinkbase.conf /etc/apache2/sites-available

# install and configure poetry
ENV POETRY_VIRTUALENVS_IN_PROJECT=true
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
RUN ln -sf /root/.poetry/bin/poetry /usr/bin/poetry
WORKDIR /home/debian/
RUN poetry install

WORKDIR /home/debian/src
#RUN poetry run gunicorn -w 4 -b 127.0.0.1:8080 main:app


#RUN /usr/sbin/a2enmod headers
#RUN /usr/sbin/a2dissite 000-default.conf
#RUN /usr/sbin/a2ensite drinkbase.conf

#RUN service apache2 start 

ENTRYPOINT tail -f /var/log/apache2/access.log

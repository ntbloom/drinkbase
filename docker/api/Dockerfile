FROM python:3.9-slim-buster

RUN apt-get update && apt-get install --no-install-recommends -y \
  apache2 \
  libapache2-mod-wsgi-py3 \
  python3-certbot-apache 

COPY ./backend/src /home/debian/
COPY ./docker/api/conf/ports.conf /etc/apache2/
COPY ./docker/api/conf/apache2.conf /etc/apache2/
COPY ./docker/api/conf/drinkbase.conf /etc/apache2/sites-available

RUN /usr/sbin/a2enmod headers
RUN /usr/sbin/a2dissite 000-default.conf
RUN /usr/sbin/a2ensite drinkbase.conf

RUN service apache2 restart

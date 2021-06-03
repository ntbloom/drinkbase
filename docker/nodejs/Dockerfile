# Dockerfile for building drinkbase javascript bundle
FROM node:14-alpine

COPY ./frontend /builder

WORKDIR /builder

RUN npm install
RUN npm run build



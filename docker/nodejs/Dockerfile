# Dockerfile for building drinkbase javascript bundle
FROM node:24-alpine 

COPY ./frontend /builder
WORKDIR /builder
RUN npm install
CMD npm run build


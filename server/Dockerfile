FROM node:alpine

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

RUN mkdir -p /usr/app/ebay-alert-api
WORKDIR /usr/app/ebay-alert-api

COPY package.json /usr/app/ebay-alert-api
COPY package-lock.json /usr/app/ebay-alert-api

RUN npm install

COPY . /usr/app/ebay-alert-api
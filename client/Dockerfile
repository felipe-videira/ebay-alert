FROM node:alpine

ENV CHOKIDAR_USEPOLLING=true
ENV SASS_PATH=node_modules:src
ENV NODE_PATH=node_modules:src

RUN mkdir -p /usr/app/ebay-alert-web
WORKDIR /usr/app/ebay-alert-web

RUN apk add --no-cache udev ttf-freefont chromium git
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

COPY package.json package-lock.json /usr/app/ebay-alert-web/

RUN npm install

COPY . /usr/app/ebay-alert-web
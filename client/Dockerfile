FROM node:alpine

RUN mkdir -p /usr/app/ebay-alert-web
WORKDIR /usr/app/ebay-alert-web

COPY package.json /usr/app/ebay-alert-web
COPY package-lock.json /usr/app/ebay-alert-web

RUN npm install

COPY . /usr/app/ebay-alert-web

CMD ["npm", "start"]
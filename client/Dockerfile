FROM node:alpine

ENV CHOKIDAR_USEPOLLING=true
ENV SASS_PATH=node_modules:src
ENV NODE_PATH=node_modules:src

RUN mkdir -p /usr/app/ebay-alert-web
WORKDIR /usr/app/ebay-alert-web

COPY package.json /usr/app/ebay-alert-web
COPY package-lock.json /usr/app/ebay-alert-web

RUN npm install

COPY . /usr/app/ebay-alert-web

CMD ["npm", "start"]
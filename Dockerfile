FROM node:8

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app

EXPOSE 3003

CMD node app.js


FROM node:14-alpine

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
COPY ./config/local.env.js.example ./config/local.env.js

ENTRYPOINT ["node", "./src/index.js"]

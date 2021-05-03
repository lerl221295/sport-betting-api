FROM node:14-alpine

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .

ENTRYPOINT ["node ./src"]

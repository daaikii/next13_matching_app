FROM node:20-alpine3.17


COPY ["/front/package.json", "/front/package-lock.json", "./"]

RUN npm install --silent


COPY . .


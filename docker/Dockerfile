FROM node:18-alpine as builder

WORKDIR /app

COPY package.json ./

RUN apk add --update python3 make g++
RUN yarn install --frozen-lockfile

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN yarn build 

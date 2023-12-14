FROM node:18-alpine as build-stage

WORKDIR /app

COPY package*.json /app/

RUN apk add --update python3 make g++
RUN yarn install --frozen-lockfile

COPY ./ /app/

RUN yarn build

# =================================================================

FROM nginx:latest as run-stage

COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx/template.conf /etc/nginx/conf.d/default.conf

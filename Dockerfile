FROM node:8-alpine

RUN apk update
RUN apk add util-linux

WORKDIR /usr/src

COPY . .

RUN npm ci
RUN npm run build
RUN mv ./dist /public

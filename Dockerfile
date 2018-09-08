FROM node:alpine

RUN apk update
RUN apk add util-linux

WORKDIR /usr/src

COPY . .

RUN npm ci
RUN npx parcel build --out-dir /public ./src/index.html
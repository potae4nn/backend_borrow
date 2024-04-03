FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn

RUN yarn build

RUN rm -rf ./src

EXPOSE 3000

CMD [ "yarn","start:prod" ]
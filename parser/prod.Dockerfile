FROM node:12.13.1-slim

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install 

COPY . .

EXPOSE 6000

RUN apt-get update

CMD ["npm" , "run" , "start:prod"]



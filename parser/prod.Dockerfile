FROM node:12.13.1-slim

RUN apt-get install libX11-6

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install 

COPY . .

EXPOSE 6000

CMD ["npm" , "run" , "start:prod"]
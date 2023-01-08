FROM node:14-alpine

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . /home/app

EXPOSE 8080

RUN npm install

RUN npm test

CMD ["npm", "start"]


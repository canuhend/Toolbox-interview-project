FROM node:16-alpine

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . /home/app

EXPOSE 3000

RUN npm install

CMD ["npm", "start"]


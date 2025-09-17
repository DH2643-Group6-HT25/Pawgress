FROM node:22-alpine3.21

WORKDIR /client

COPY package*.json .

RUN npm i

COPY . .

CMD [ "npm", "run", "dev" ]

FROM node:22-alpine3.21

WORKDIR /client

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]

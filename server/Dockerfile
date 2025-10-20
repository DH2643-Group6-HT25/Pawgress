FROM node:22-alpine3.21

WORKDIR /server

COPY package*.json .

ENV NODE_ENV=development

RUN echo "NODE_ENV before: $NODE_ENV"
RUN npm i

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

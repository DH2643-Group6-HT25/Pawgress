# Pawgress
Stay PRRductive

## Getting Started

### Docker
1. install docker desktop from : https://www.docker.com/get-started/
2. start docker desktop
3. run `docker compose up -d` via terminal on the project root folder to run the apps on background
4. for shutting down docker image: run `docker compose stop`
5. if you pull any new changes on dockerfile / compose / package.json / package-lock.json, run `docker compose up -d --build`

### MongoDB
Mongoose is defined as an Object Data Modeling (ODM) library that has been built for MongoDB and JavaScript. It is used to define the objects with a schema which will be further mapped to a MongoDB document. 

We use MongoDB to manage our data in server.

### TS File
ts-node is a just-in-time compiler that compiles .ts files into JavaScript at runtime and then executes it. 

1. When developing, run `npx ts-node app.ts` via terminal on the server folder.
2. To exist, use `Ctrl + C`

### Local Access

- go to http://localhost:3001/ to access server apps

- go to http://localhost:5173/ to access client apps

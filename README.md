<p align="center">
<img src="https://raw.githubusercontent.com/gurayyarar/NodeJsPackageManager/master/images/app.png" alt="drawing"/>
</p>

# Node.js Boilerplate

Node.js & ExpressJS applications solves an isolated range of problems common to all applications such as route management, request and response and views. The lean structure of this framework allows us to get an application up and running quickly with few lines of code, but any and all types of functionality need practically to be done by hand.

So, the ideia is create a template so I wouldn't have to start my Node.js applications completely from scratch. I have plans to make this repository more and more complete as needs arise.

- [ ] Socket.io
- [x] Rest API base 
- [ ] Redis with Node.js
- [ ] Design Pattern Strategy

## Setup

Create a .env file on the project directory to store sensitive or changeable data:

```bash
SERVER_PORT=3000
NODE_ENV=development
JWT_SECRET=SECRET
JWT_EXPIRATION=1d

PG_DATABASE=
PG_HOST=127.0.0.1
PG_USERNAME=
PG_PASSWORD=

```

## Install

Run the following commands:

```bash
$ npm install && npm install -g sequelize-cli
```

Run all migrations:

```bash
$ sequelize db:migrate
```

Start the server:

```bash
$ npm start
```
for development
```bash
$ npm run dev:debug
```
---

## Useful Docker commands:


### Init a redis instance:

``` bash
docker run --name <instance-name> -d -p 6379:6379 -i -t redis
```
### Init a mongodb instance:

``` bash
docker run --name <instance-name> -d -p 27017:27017 -i -t mongo
```

### Init a postgres instance:

``` bash
docker run --name <instance-name> -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

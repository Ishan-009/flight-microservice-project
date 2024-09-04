This is a base node js project template, which anyone can use as it has been prepared, by keeping some of the most important code principles and project management recommendations. Feel free to change anything.

Steps to setup manually

npm init => for to create package.json file

in package.json , you can also put your test scripts

installing packages

express, dotenv:- manage env variables,
http status codes :=- to manage status code

create src folder,
inside that create entry point file index.js

then create other folders in that all folders create index.js file so we can export all the files of lets say middleware via a single file (index.js) so that we have to import it only once if we wanna use multiple middleware

controller,middleware,services,config, utils

then create route and crate index.js and create v1 folder inside routes in that also create index.js file.

Installing nodemon:- automatically update server with updated code, live updated load server

using npx allows to use package to utilize package without installing

set dev script
and then you can server by command npm run dev

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"dev":"npx nodemon src/index.js"
},

then you can go on creates common "/api router and routes and then in that "/v1" will be redirected to v1 routes and then execute request

<!-- Style Guide -->

using filenames with dashes , underscore etc

<!-- using http status code library in our status codes  -->

Httpstatus.OK example

<!-- adding repository folder and add index.js  -->

<!-- Adding Logging to our application  -->

`src` -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests. (You might want to make separate tests folder)

Lets take a look inside the `src` folder

- `config` -> In this folder anything and everything regarding any configurations or setup of a library or module will be done. For example: setting up `dotenv` so that we can use the environment variables anywhere in a cleaner fashion, this is done in the `server-config.js`. One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here.

- `routes` -> In the routes folder, we register a route and the corresponding middleware and controllers to it.

- `middlewares` -> they are just going to intercept the incoming requests where we can write our validators, authenticators etc.

- `controllers` -> they are kind of the last middlewares as post them you call you business layer to execute the budiness logic. In controllers we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output.

- `repositories` -> this folder contains all the logic using which we interact the DB by writing queries, all the raw queries or ORM queries will go here.

- `services` -> contains the buiness logic and interacts with repositories for data from the database

- `utils` -> contains helper methods, error classes etc.

### Setup the project

- Download this template from github and open it in your favourite text editor.
- Go inside the folder path and execute the following command:

```
npm install
```

- In the root directory create a `.env` file and add the following env variables
  ```
      PORT=<port number of your choice>
  ```
  ex:
  ```
      PORT=3000
  ```
- go inside the `src` folder and execute the following command:
  ```
    npx sequelize init
  ```
- By executing the above command you will get migrations and seeders folder along with a config.json inside the config folder.
- If you're setting up your development environment, then write the username of your db, password of your db and in dialect mention whatever db you are using for ex: mysql, mariadb etc
- If you're setting up test or prod environment, make sure you also replace the host with the hosted db url.

- To run the server execute

```
npm run dev
```

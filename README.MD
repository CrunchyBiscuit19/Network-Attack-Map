# Network Attack Map

This repo contains the code for the network attack map project.

## Dockerized Container Usage

Docker Desktop is required for the running of network attack map application. Each component of the network attack map is contained within one docker container and are composed together with docker-compose.<br>
To run the application, run `docker-compose up` at the root directory level.

## Major Application Components

### Django Backend

Under `/Django_Backend/` directory is the django-based API interface for interfacing the front-end with the log-storage servers.<br>
Current installed packages are `django, djangorestframework, mysqlclient, corsheaders`.<br>
Django Backend requires a MariaDB server with a database named `network_attack_map` with credentials stored in `Django_Backend/Network_Attack_Map/MariaDB.cnf`.<br>

### API Endpoints of Django Backend

| Endpoint URL          | Method | Description   | Data Supplied                | Data Returned   |
| --------------------- | ------ | ------------- | ---------------------------- | --------------- |
| /api/auth/login/      | POST   | Login         | email, Password              | sessionid, csrf |
| /api/auth/logout/     | GET    | Logout        | Nil                          | Nil             |
| /api/auth/check/      | GET    | Check Login   | Nil                          | Login boolean   |
| /api/user/create/     | POST   | Create User   | username, email, password    | Nil             |
| /api/files/log/       | GET    | Get Logs      | Nil                          | Logs in JSON    |
| /api/files/retrieve/  | POST   | Retrieve logs | start time, end time         | Nil             |
| /api/files/terminate/ | GET    | Stop Logs     | Nil                          | Nil             |


### React Frontend

Under `/React_Frontend/` directory are the React components, Redux store, and Material UI styles that build the webpage interface for interacting with the network attack map.<br>

Current installed packages are `@material-ui, @reduxjs, axios, clsx, leaflet, react, react-dom, react-leaflet, react-redux, react-router-dom, redux, typescript`.<br>

The react web application is deployed using ExpressJS. The file `React_Frontend/server.js` will be run to host the webpage of the production build of the application. <br>

## Legacy Configuration Settings

These settings are phased out by dockerized containers

### Django Backend

* Directory - `network-attack-map\Django_Backend`
* Venv Initialization - `.\set_virtual_environment.ps1`
* Venv Deactivation - `deactivate`
* Install Packages (without Venv) - `poetry install`
* Install Poetry Package Manager - `pip install poetry`
* Run Server - `python manage.py runserver`

### Elasticsearch

* Directory - `network-attack-map\Elasticsearch`

### LogStash

* Directory - `network-attack-map\LogStash`

### MariaDB Database

* Initialize Database - `python manage.py migrate`

### Python for Redis

* Directory - `network-attack-map\PyRedis`
* Install redis - `pip install redis`
* Run Redis Script - `./PyRedis/redis-script.py`

### React Frontend

* Directory - `network-attack-map\React_Frontend`
* Install Packages - `npm install`
* Run Server - `npm start`
* Create Production Build - `npm run build`.
* Run Production Build - `node React_Frontend/server.ts`

### Redis

* Directory - `network-attack-map\Redis`


## Project Status

Front End UI is created and tested.<br>
* Login modal with login/out, registration and user information Completed
* Colour modification for theme and animation colour Completed
* Speed adjustment for animations Completed
* Privilege management for users Completed

Back End API Structure is created and tested.<br>
* Login endpoint with error handling Completed
* User Creation endpoint with validation and error handling Completed
* Logout endpoint with error handling Completed
* Status endpoint with error handling Completed
* Log fetch endpoint with serialization Completed

Communication between Front End and Back End is currently being tested.
* Login functionality and handling Completed (Session ID Validity 6 Hours)
* Logout functionality and handling Completed
* User creation functionality and handling Completed
* User login status check and handling Completed:
* Log fetching functionality and handling in progress:
  * Log serialization function is working in django
  * Log pagination feature completed and tested
  * Iteration Request feature completed and tested
  * Need to determine appropriate fields for logs
  * Need to implement fetching of logs from logstash

Log Infrastructure (Redis + LogStash + Elasticsearch) is implemented and tested.
* Redis now caches the logs fed from stated log file
* LogStash fetches the logs from Redis and pushes it into the LogStash pipeline
* LogStash stores the logs into Elasticsearch storage and indexes it by default
* LogStash filters out unwanted log fields in CSV file and whitelists the specified log fields required
* Range Query is able to fetch logs from Elasticsearch storage within specified range
* Filtering logs by timestamp is now completed
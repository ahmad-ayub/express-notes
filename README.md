<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h2 align="center">Express Notes </h2>
</div>

## About The Project

This is an ExpressJS application with the following features.

- Typescript all the way
- EsLint, Prettier and Husky integration
- Docker
- Sequelize integration
- Logging
- Error handling in a central place
- Request Validation
- Dependency Injection

## Technologies

The major technologies that were used to build this project are:

- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Sequelize](https://sequelize.org/)
- [Docker](https://www.docker.com/)
- [Redis](https://redis.io/)

## Getting Started

Following are the instructions to get the project up and running.

### Prerequisites

To run this project You will need the following things installed on your machine

- NodeJS
- NPM
- Docker (Optional)

### Run with Docker Compose

Copy the `.env.sample` file to `.env`

If you have Docker installed and running on your machine run

```sh
docker compose up
```

It will give you 3 things

1. The Express server in development mode (With hot reloading support)
2. A MySQL database server
3. A Standalone Redis server

The server should be accessible at `http://localhost:{PORT}`

## Project Structure

Our app directory consists on the following folders

| Directory | Description |
|---|---|
| src/config/  | Contains all of your environment vars. |
| src/controllers/  | Contains all of our endpoints defination and parameter extraction. |
| src/services/ | Business logic and calls interfacing with repository layer. |
| src/repositories/ | All interaction with the database layer. |
| src/models/ | Sequelize entities. |
| app/routes/ | Our endpoints listing and middleware validations. |
| app/middlewares/ | Middleware Implementations. |
| app/requests/ | Request DTO schemas. |
| app/utils/ | helper function definitions. |

## API ENDPOINTS

### Auth

HOST and PORT Values are from `.env`, If copied from `.env.sample` they should be `localhost` and `4000` 

**Register User**: POST `{HOST}:{PORT}/api/v1/sign-up`
**Sample Request Body**: 
```
{
"email": "abc@xyz.com",
"password": "testPassword",
"name": "Ahmad Ayub"
}
```

**User SignIn**: POST `{HOST}:{PORT}/api/v1/sign-in`
**Sample Request Body**: 
```
{
"email": "abc@xyz.com",
"password": "testPassword",
}
```
**This will return `Token` which needs to be used in Authorization Header preceeded with keyword Bearer, i.e. `Authorization: Bearer {Token}`. All Subsequent Note Routes require Bearer Auth token to work**

### Notes

**Create Note**: POST `{HOST}:{PORT}/api/v1/note`

**Sample Request Body**: 
```
{
"title": "test Note",
"content": "This is a test note.",
"type": "personal"
}
```
**Get User Note By Id**: GET `{HOST}:{PORT}/api/v1/note/:id`

**Get All User Notes**: GET `{HOST}:{PORT}/api/v1/note`

**Update User Note**: PUT `{HOST}:{PORT}/api/v1/note/:id`

**Sample Request Body**: 
only fields sent in the request will be updated
```
{
"title": "abc@xyz.com",
"content": "testPassword",
"type": "work"
}
```
**Delete User Note**: DELETE `{HOST}:{PORT}/api/v1/note/:id`

## Notes on Design Patterns Used

**Typedi** was used to create and inject class instances where required. This ensures all @service classes are **Singleton** objects. Example: See `services/LoggerClient.ts`

**Factory Method Pattern** was used to instantiate different note types which are `personal` and `work`. Create and Update Note request accepts `personal`, `private`, `work`, `official` as type parameter. `private` and `official` are changed to `personal` and `work` respectively by Factory subclasses to showcase factory method business logic implementation. See services/noteFactory/

## Possible Future Improvements

- Add Unit, e2e and Integration testing frameworks
- Use Migrations instead of Sequelize.Sync() to migrate changes to Database - sync can't be used in Prod
- Docker setup for prod deployment - change owner to node and run npm ci
- Use Docker Multistage Builds
- Add deployment workflows (Github Action etc)
- Add Api documentation (OpenAPI specs)
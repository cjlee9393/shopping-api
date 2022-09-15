# Shopping-API

## Usage

1. instructions for setup and running the project
   1. setup .env file
      ```      
      echo 'POSTGRES_DB="full_stack_dev"' >> .env
      echo 'POSTGRES_HOST_AUTH_METHOD="trust"' >> .env
      echo 'POSTGRES_HOST="127.0.0.1"' >> .env
      echo 'POSTGRES_USER="full_stack_user"' >> .env
      echo 'POSTGRES_PASSWORD="password123"' >> .env
      echo 'ENV="dev"' >> .env
      echo 'BCRYPT_PASSWORD="speak-friend-and-enter"' >> .env
      echo 'SALT_ROUNDS=10' >> .env
      echo 'TOKEN_SECRET="shout-friend-and-enter"' >> .env
      echo 'TOKEN_AUTH="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiZmlyc3RfbmFtZSIsImxhc3RfbmFtZSI6Imxhc3RfbmFtZSIsInVzZXJuYW1lIjoidXNlcm5hbWUiLCJwYXNzd29yZF9kaWdlc3QiOiJwYXNzd29yZF9kaWdlc3QifSwiaWF0IjoxNjYzMTQxNDE2fQ.5PD-SCR6u2lNTD1WNt3j-c1xdLTLktewW-MsxTMWUvc"' >> .env
      ```

   2. setup npm packages dependencies and setup a connection to a Postgres database
      ```bash
      npm i
      ```

   3. running the project
      ```bash
      npm run start
      ```
2. instructions for unit testing using Jasmine
    ```bash
    npm run test
    ```

## Sample URLs for API Endpoints
- see REQUIREMENTS.md for API Endpoints
#### Products
- Index: http://HostURL:3000/products
- Show: http://HostURL:3000/products/1

#### Users
- Index http://HostURL:3000/users
- Show [token required]: 'users/:id' [GET]
- Create New [token required]: 'users' [POST]

#### Orders
- Current Order by user (args: user id)[token required]: 'orders/:id' [GET]



## Ports
- backend : 3000 (see src/server.ts)
- database: 5432 (see docker-compose.yml)

## .env

- POSTGRES_DB="full_stack_dev"
- POSTGRES_HOST_AUTH_METHOD="trust"
- POSTGRES_HOST="127.0.0.1"
- POSTGRES_USER="full_stack_user"
- POSTGRES_PASSWORD="password123"
- ENV="dev"
- BCRYPT_PASSWORD="speak-friend-and-enter"
- SALT_ROUNDS=10
- TOKEN_SECRET="shout-friend-and-enter"
- TOKEN_AUTH="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiZmlyc3RfbmFtZSIsImxhc3RfbmFtZSI6Imxhc3RfbmFtZSIsInVzZXJuYW1lIjoidXNlcm5hbWUiLCJwYXNzd29yZF9kaWdlc3QiOiJwYXNzd29yZF9kaWdlc3QifSwiaWF0IjoxNjYzMTQxNDE2fQ.5PD-SCR6u2lNTD1WNt3j-c1xdLTLktewW-MsxTMWUvc"

## Dependencies

| Type | Description |
| ----------- | ----------- |
| Software | The project is tested on Google Chrome 100.0.4896.75(official build) (arm64) with javascript version 1.7. The project is tested on node.js version 16.14.2. The project is tested with packages dependencies with their versions (below the table)|
| Firmware | No known dependency |
| Hardware | the project is tested on MacBook Air (M1, 2020) |

```javascript
"dependencies": {
   "bcrypt": "^5.0.1",
   "cors": "^2.8.5",
   "db-migrate": "^0.11.13",
   "db-migrate-pg": "^1.2.2",
   "dotenv": "^16.0.1",
   "express": "^4.17.1",
   "jsonwebtoken": "^8.5.1",
   "pg": "^8.7.3"
},
"devDependencies": {
   "@types/bcrypt": "^5.0.0",
   "@types/chai": "^4.3.3",
   "@types/cors": "^2.8.12",
   "@types/express": "^4.17.9",
   "@types/jasmine": "^3.10.6",
   "@types/jsonwebtoken": "^8.5.9",
   "@types/pg": "^7.14.7",
   "@types/supertest": "^2.0.12",
   "chai": "^4.3.6",
   "jasmine": "^3.6.4",
   "jasmine-spec-reporter": "^7.0.0",
   "jasmine-ts": "^0.3.0",
   "supertest": "^6.2.4",
   "ts-node": "^10.6.0",
   "tsc-watch": "^4.2.9",
   "typescript": "^4.8.3"
}
```

## License

[License](LICENSE.txt)
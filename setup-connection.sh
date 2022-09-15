#!/bin/bash

# Load environment variables from dotenv / .env file in Bash
# https://gist.github.com/mihow/9c7f559807069a03e302605691f85572
if [ -f .env ]; then
  export $(cat .env | xargs)
else
  echo ".env file does not exist. See README.md"
  exit 100
fi

# create tables and columns to a Postgres database
export ENV='dev' && db-migrate --env dev up

# insert into tables in Postgres database
docker container exec -i $(docker ps --format "{{.Names}}") psql -U ${POSTGRES_USER} ${POSTGRES_DB} < data.sql
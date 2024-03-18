
#!/usr/bin/env bash
set -x
set -eo pipefail

# Needed to ping the host to check whether the db finished the bootstrap or not
if ! [ -x "$(command -v mysql)" ]; then
  echo >&2 "Error: mysql client is not installed."
  exit 1
fi

# Needed to run migrations
if ! [ -x "$(command -v yarn run knex)" ]; then
  echo >&2 "Error: knex is not installed."
  echo >&2 "Use:"
  echo >&2 "    yarn install"
  echo >&2 "to install it."
  exit 1
fi

DB_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD:=sru5fkrUW2XQe9wu}
DB_NAME=${MYSQL_DB_NAME:=my-app}
DB_PORT=${MYSQL_PORT:=33064}
DB_HOST=${MYSQL_HOST:=127.0.0.1}

# Use SKIP_DOCKER flag to init without creating the instance, e.g `SKIP_DOCKER=true sh ./scripts/init_db.sh`
if [[ -z "${SKIP_DOCKER}" ]]
then
docker run --name my-app-mysql \
  -e MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD} \
  -e MYSQL_DATABASE=${DB_NAME} \
  -p "${DB_PORT}:3306" \
  -d mysql:8
fi

# Keep pinging Mysql until it's ready to accept commands
until mysql -h ${DB_HOST} --port ${DB_PORT} -u root -p${DB_ROOT_PASSWORD} -e "show databases;"; do
  >&2 echo "Mysql is still unavailable - retrying in 3 seconds..."
  sleep 3
done

### Create testing database
if [[ -z "${SKIP_DOCKER}" ]]
then
  mysql -h ${DB_HOST} --port ${DB_PORT} -u root -p${DB_ROOT_PASSWORD} -e "CREATE DATABASE my_app_test; SHOW DATABASES;"; 
fi

>&2 echo "Mysql is up and running on port 33063 - running migrations now!"

env $(cat .env | xargs) yarn run knex migrate:latest --env development

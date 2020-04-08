#!/usr/bin/env bash

POSTGRES_NAME=blog-postgres
MIGRATOR_NAME=cda-migrator
DIR=$(dirname $(pwd))/$(basename $(pwd))
POSTGRES_VERSION=11.4-alpine

function cleanup() {
  docker rm -f $POSTGRES_NAME
}

trap cleanup SIGINT

cleanup

docker run \
  --name $POSTGRES_NAME \
  --rm \
  --detach \
  --publish 5432:5432 \
  --env-file $DIR/postgres/dev.env \
  --volume $DIR/postgres/init.sh:/docker-entrypoint-initdb.d/init.sh \
  postgres:$POSTGRES_VERSION

sleep 3

docker build -t $MIGRATOR_NAME $DIR/migrator
docker run \
  --rm \
  --name $MIGRATOR_NAME \
  --link $POSTGRES_NAME:database \
  --env DB_USER=app \
  --env DB_PASSWORD=app \
  --env DB_NAME=blogdb \
  --env DB_HOST=database \
  $MIGRATOR_NAME

docker logs -f $POSTGRES_NAME

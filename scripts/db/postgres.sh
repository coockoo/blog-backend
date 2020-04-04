#!/usr/bin/env bash

POSTGRES_NAME=cda-postgres
DIR=$(dirname $(pwd))/$(basename $(pwd))
POSTGRES_DB=blogdb
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
  postgres:$POSTGRES_VERSION

sleep 3

docker logs -f $POSTGRES_NAME


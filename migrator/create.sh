#!/usr/bin/env bash

MIGRATIONS_DIR=migrator/migrations/
TIMESTAMP=$(date +%Y%m%d%H%M%S)
NAME=$1
FILENAME=$MIGRATIONS_DIR$TIMESTAMP-$NAME.sql

MANUAL="
Usage: create.sh FILENAME
"

if [[ -z $NAME ]]
then
  echo "$MANUAL"
  exit
fi

touch $FILENAME
echo $FILENAME

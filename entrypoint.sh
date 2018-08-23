#!/bin/sh

set -e

while true; do
  nc -z postgres 5432 && break
  sleep 1
done

npm run migrate

exec "$@"

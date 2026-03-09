#!/bin/sh

if [ "$NODE_ENV" = "development" ]; then
  exec yarn dev
else
  exec yarn start
fi

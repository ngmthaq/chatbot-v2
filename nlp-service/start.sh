#!/bin/sh

if [ "$PY_ENV" = "development" ]; then
  exec fastapi dev app/main.py --host 0.0.0.0 --port "$PORT"
else
  exec fastapi run app/main.py --host 0.0.0.0 --port "$PORT"
fi

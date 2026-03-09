# chatbot-v2

Monorepo for a chatbot stack with:
- `client` (React + Vite)
- `server` (Express.js)
- `nlp-service` (FastAPI)
- Infrastructure via Docker (`mysql`, `adminer`, `minio`, `redis`, `ollama`)

## Prerequisites
- Docker
- Docker Compose

## Start infrastructure
```bash
docker compose --env-file .env.docker -f docker-compose.yml up -d
```

## Start app containers
```bash
./start-apps.sh
```

## Stop app containers
```bash
./stop-apps.sh
```

## Stop infrastructure
```bash
docker compose --env-file .env.docker -f docker-compose.yml down
```

## Default local endpoints
- Client: http://localhost:5173
- Server: http://localhost:3000
- NLP Service: http://localhost:8000
- Adminer: http://localhost:8080
- MinIO API: http://localhost:9000
- MinIO Console: http://localhost:9001
- Redis: localhost:6379
- Ollama: http://localhost:11434

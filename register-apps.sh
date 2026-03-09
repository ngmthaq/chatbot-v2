#!/usr/bin/env bash

APPS=()

register_app() {
  local name="$1"
  local context="$2"
  local env_file="$3"
  local build_env_key="$4"
  local target="${5:-}"
  APPS+=("${name}|${context}|${env_file}|${build_env_key}|${target}")
}

# register_app <container_name> <context_dir> <env_file> <build_env_key> [build_target]
register_app "chatbot-server" "server" "server/.env.local" "NODE_ENV"
register_app "chatbot-nlp-service" "nlp-service" "nlp-service/.env.local" "PY_ENV"
register_app "chatbot-client" "client" "client/.env.local" "NODE_ENV" "development"

INFRA_SERVICES=(mysql adminer minio redis ollama)

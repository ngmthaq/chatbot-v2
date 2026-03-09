#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PROJECT_NAME=$(basename "$ROOT_DIR")
NETWORK_NAME="${PROJECT_NAME}_default"

source "$ROOT_DIR/register-apps.sh"

parse_app() {
  local record="$1"
  IFS='|' read -r app_name app_context app_env_file app_build_env_key app_target <<< "$record"
}

get_env_value() {
  local env_file="$1"
  local key="$2"
  grep "^${key}=" "$env_file" | cut -d '=' -f2-
}

remove_container_if_exists() {
  local name="$1"
  if docker ps -a --format '{{.Names}}' | grep -q "^${name}$"; then
    docker rm -f "$name" >/dev/null 2>&1 || true
  fi
}

list_app_names() {
  local names=()
  for app in "${APPS[@]}"; do
    parse_app "$app"
    names+=("$app_name")
  done
  local IFS=', '
  printf '%s' "${names[*]}"
}

if ! docker network inspect "$NETWORK_NAME" >/dev/null 2>&1; then
  docker compose --env-file "$ROOT_DIR/.env.docker" -f "$ROOT_DIR/docker-compose.yml" up -d "${INFRA_SERVICES[@]}"
fi

for app in "${APPS[@]}"; do
  parse_app "$app"

  full_env_file="$ROOT_DIR/$app_env_file"
  app_port=$(get_env_value "$full_env_file" "PORT")
  app_build_env_value=$(get_env_value "$full_env_file" "$app_build_env_key")
  app_image="${app_name}:local"

  remove_container_if_exists "$app_name"

  if [ -n "$app_target" ]; then
    docker build \
      --target "$app_target" \
      --build-arg "$app_build_env_key=$app_build_env_value" \
      --build-arg "PORT=$app_port" \
      -t "$app_image" \
      "$ROOT_DIR/$app_context"
  else
    docker build \
      --build-arg "$app_build_env_key=$app_build_env_value" \
      --build-arg "PORT=$app_port" \
      -t "$app_image" \
      "$ROOT_DIR/$app_context"
  fi

  # Build volume mounts for hot-reloading (mount only source directories)
  volume_mounts=()
  
  if [ "$app_build_env_key" = "NODE_ENV" ]; then
    # Node.js apps: mount src directory only
    volume_mounts+=(
      -v "$ROOT_DIR/$app_context/src:/app/src"
    )
    # For client app, also mount public if it exists
    if [ "$app_name" = "chatbot-client" ] && [ -d "$ROOT_DIR/$app_context/public" ]; then
      volume_mounts+=(-v "$ROOT_DIR/$app_context/public:/app/public")
    fi
  elif [ "$app_build_env_key" = "PY_ENV" ]; then
    # Python apps: mount app directory only
    volume_mounts+=(
      -v "$ROOT_DIR/$app_context/app:/app/app"
    )
  fi

  docker run -d \
    --name "$app_name" \
    --restart unless-stopped \
    --env-file "$full_env_file" \
    --network "$NETWORK_NAME" \
    -p "$app_port:$app_port" \
    "${volume_mounts[@]}" \
    "$app_image"
done

printf 'Started app containers: %s\n' "$(list_app_names)"

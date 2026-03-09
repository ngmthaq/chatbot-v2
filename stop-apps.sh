#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
source "$ROOT_DIR/register-apps.sh"

parse_app() {
  local record="$1"
  IFS='|' read -r app_name app_context app_env_file app_build_env_key app_target <<< "$record"
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

for app in "${APPS[@]}"; do
  parse_app "$app"
  container="$app_name"
  if docker ps -a --format '{{.Names}}' | grep -q "^${container}$"; then
    docker rm -f "$container" >/dev/null 2>&1 || true
  fi
done

printf 'Stopped app containers: %s\n' "$(list_app_names)"

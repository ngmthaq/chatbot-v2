.PHONY: dev lint lint-fix format format-check

dev:
	PY_ENV=development fastapi dev app/main.py --host 0.0.0.0 --port 8000

lint:
	ruff check .

lint-fix:
	ruff check . --fix

format:
	ruff format .

format-check:
	ruff format . --check

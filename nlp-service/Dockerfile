# Use a lightweight Python base image.
FROM python:3.12-slim

# Set the working directory inside the container.
WORKDIR /app

# Prevent Python from writing .pyc files and enable unbuffered logs.
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Accept environment mode from build-time arguments (default: development).
ARG PY_ENV=development

# Copy dependency manifests first to leverage Docker layer caching.
COPY requirements.txt requirements-dev.txt ./

# Install Python dependencies based on PY_ENV.
RUN if [ "$PY_ENV" = "development" ]; then \
			pip install --no-cache-dir -r requirements-dev.txt; \
		else \
			pip install --no-cache-dir -r requirements.txt; \
		fi

# Copy application source files into the container.
COPY . .

# Make the startup script executable.
RUN chmod +x /app/start.sh

# Accept server port from build-time arguments (default: 8000).
ARG PORT=8000

# Expose build-time environment mode at runtime.
ENV PY_ENV=${PY_ENV}

# Expose build-time port at runtime.
ENV PORT=${PORT}

# Document the container port.
EXPOSE ${PORT}

# Run startup script that selects dev/prod command by PY_ENV.
CMD ["/app/start.sh"]

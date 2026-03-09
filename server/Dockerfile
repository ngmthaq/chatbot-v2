# Use Node.js Alpine image for running the Express server.
FROM node:20-alpine

# Set the working directory inside the container.
WORKDIR /app

# Enable Corepack so Yarn can be used reliably in the container.
RUN corepack enable

# Copy package manifest and lockfile required for deterministic dependency installation.
COPY package.json yarn.lock ./

# Accept NODE_ENV from build-time arguments with a default value.
ARG NODE_ENV=development

# Install project dependencies using strict lockfile mode.
RUN yarn install --frozen-lockfile

# Copy the entire application source code.
COPY . .

# Make the startup script executable.
RUN chmod +x /app/start.sh

# Accept PORT from build-time arguments with a default value.
ARG PORT=3000

# Set runtime environment variable for Node.js environment.
ENV NODE_ENV=${NODE_ENV}

# Set runtime environment variable for the server port.
ENV PORT=${PORT}

# Document the port exposed by this image.
EXPOSE ${PORT}

# Start script selects dev/prod command by NODE_ENV.
CMD ["/app/start.sh"]

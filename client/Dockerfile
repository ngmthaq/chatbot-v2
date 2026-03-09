# Use Node.js Alpine image as the base.
FROM node:20-alpine AS base

# Set the working directory inside the container.
WORKDIR /app

# Enable Corepack so Yarn can be used reliably in the container.
RUN corepack enable

# Copy package manifest and lockfile required for deterministic dependency installation.
COPY package.json yarn.lock ./

# Accept NODE_ENV from build-time arguments with a default value.
ARG NODE_ENV=production

# Install project dependencies using strict lockfile mode.
RUN yarn install --frozen-lockfile

# Copy the entire application source code.
COPY . .

# Accept PORT from build-time arguments with a default value.
ARG PORT=5173

# Set runtime environment variables.
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}

# Build the production-ready static files only if NODE_ENV is production.
RUN if [ "$NODE_ENV" = "production" ]; then yarn build; fi

# Production stage: Use Nginx to serve static files.
FROM nginx:1.27-alpine AS production

# Accept PORT from build-time arguments.
ARG PORT=80

# Set runtime environment variable for Nginx template.
ENV PORT=${PORT}

# Copy built static assets from the base stage.
COPY --from=base /app/dist /usr/share/nginx/html

# Copy Nginx template config that uses the PORT environment variable.
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Document the port exposed by this image.
EXPOSE ${PORT}

# Start Nginx in the foreground.
CMD ["nginx", "-g", "daemon off;"]

# Development stage: Use Vite dev server.
FROM base AS development

# Document the port exposed by this image (Vite default port).
EXPOSE ${PORT}

# Start the Vite dev server with hot-reload.
CMD ["sh", "-c", "yarn dev --host 0.0.0.0 --port ${PORT}"]

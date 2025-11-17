# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.17.1

################################################################################
# Base image
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app

# Install curl (needed for healthcheck) and tini (better signal handling)
RUN apk add --no-cache curl tini

################################################################################
# Dependencies stage
FROM base AS deps

# Install production deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

################################################################################
# Build stage
FROM base AS build

# Install dev deps for building
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --loglevel=verbose

COPY . .
RUN npm run build --loglevel=verbose

################################################################################
# Final runtime stage
FROM base AS final

ENV NODE_ENV=production

# Use non-root user for safety
USER node

# Copy only what’s necessary
COPY package.json ./
COPY package-lock.json ./
COPY webpack.config.js ./

# babel
COPY .babelrc ./

# env
COPY .env .env
COPY .env.development .env.development
COPY .env.production .env.production

# folders
COPY ./public /usr/src/app/public
COPY ./src /usr/src/app/src
COPY ./views /usr/src/app/views

# build objects
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/build ./build

# Expose app port
EXPOSE 3000

# Healthcheck (uses curl now installed in base)
HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1

# Use tini as entrypoint (handles signals properly)
ENTRYPOINT ["tini", "--"]

CMD ["npm", "run", "production"]

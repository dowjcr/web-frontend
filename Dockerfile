FROM node:lts-slim as base

FROM base as deps
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .

FROM deps as build
RUN npm run build
RUN npm prune --production

FROM base as prod

# set reverse proxy headers (instead of ORIGIN env var)
# https://kit.svelte.dev/docs/adapter-node#environment-variables
# ENV PROTOCOL_HEADER=x-forwarded-proto
# ENV HOST_HEADER=x-forwarded-host
# ENV ADDRESS_HEADER=x-forwarded-for

RUN adduser nodeuser
USER nodeuser
WORKDIR /app
COPY --from=build --chown=nodeuser /app/build build/
COPY --from=build --chown=nodeuser /app/node_modules node_modules/
COPY --chown=nodeuser package.json .

CMD ["node", "build"]

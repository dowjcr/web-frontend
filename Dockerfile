FROM node:lts-slim as base

FROM base as deps
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .

FROM deps as build

ARG CMS_GETBYPATH
ARG CMS_GETPAGES
ARG CMS_AUTH
ARG CMS_HOST
ARG CMS_MAIN_COLLECTION
ENV CMS_GETBYPATH=$CMS_GETBYPATH
ENV CMS_GETPAGES=$CMS_GETPAGES
ENV CMS_AUTH=$CMS_AUTH
ENV CMS_HOST=$CMS_HOST
ENV CMS_MAIN_COLLECTION=$CMS_MAIN_COLLECTION

RUN npm run build
RUN npm prune --production

FROM base as prod

ARG APP_HOST
ARG APP_PORT
ENV HOST=$APP_HOST
ENV PORT=$APP_PORT

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

EXPOSE $PORT
CMD ["node", "build"]

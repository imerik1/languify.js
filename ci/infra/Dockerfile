FROM caddy:2.11.3-alpine

RUN addgroup -S caddy && adduser -S caddy -G caddy -D

WORKDIR /app

COPY --chown=caddy:caddy ci/infra/Caddyfile /app/Caddyfile
COPY --chown=caddy:caddy dist/site /app/site

EXPOSE 5000

USER caddy

# docker build -f ci/infra/Dockerfile -t languify-server:latest .
CMD ["caddy", "run", "--config", "/app/Caddyfile", "--adapter", "caddyfile"]

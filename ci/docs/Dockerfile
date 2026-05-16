FROM caddy:2.11.3-alpine

WORKDIR /app

COPY Caddyfile /etc/caddy/Caddyfile

RUN addgroup -S caddy && adduser -S caddy -G caddy -D
RUN mkdir -p /dist && chown -R caddy:caddy /dist /etc/caddy

EXPOSE 5000

USER caddy

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]

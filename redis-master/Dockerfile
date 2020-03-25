FROM redis:latest
COPY redis-master.conf /usr/local/etc/redis/redis.conf
VOLUME /data
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf"]
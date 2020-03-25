FROM redis:latest
ENV MASTER_IP 10.103.91.216
ENV MASTER_PORT 6379
COPY redis-slave.conf /usr/local/etc/redis/redis.conf
RUN sed -i "s/%master-ip%/$MASTER_IP/" /usr/local/etc/redis/redis.conf
RUN sed -i "s/%master-port%/$MASTER_PORT/" /usr/local/etc/redis/redis.conf
VOLUME /data
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf"]
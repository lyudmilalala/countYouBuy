FROM python:3.6
ENV MASTER_IP 10.103.91.216
ENV MASTER_PORT 6379
RUN pip install redis
COPY redis_test.py /data/app.py
VOLUME /data
CMD [ "python", "/data/app.py"]
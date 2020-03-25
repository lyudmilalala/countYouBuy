import redis

# use by local
# MASTER_IP = '192.168.1.121'
# MASTER_PORT = 30062
MASTER_IP = '10.103.91.216'
MASTER_PORT = 6379
conn = redis.ConnectionPool(host=MASTER_IP, port=MASTER_PORT, db=0)
r = redis.Redis(connection_pool=conn)
pipe = r.pipeline(transaction=True)
stores_count = {
    "supermarket": 40,
    "clothes": 100,
    "electronic": 20,
    "kitchen": 60,
    "baby": 0,
    "book": 30
}
r.hmset('history_count', stores_count)
# r.set('age', '18')
print(r.hget("history_count", "electronic").decode('utf-8'))
# pipe.execute()
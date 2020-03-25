# buid redis-master images
docker build -t lyudmila/redis-master:v1.0 redis-master/.
# kubernetes starts redis masters
kubectl create -f redis-master/redis-master-service.yml
kubectl create -f redis-master/redis-master-deployment.yml
# set master IP and port to slave configuration
MASTER_IP=$(kubectl describe service redis-master-svc | grep IP); MASTER_IP=${MASTER_IP#*IP:}
MASTER_PORT=6379
# sed -i “” "s/%master-ip%/${MASTER_IP}/" redis-slave/redis-slave.conf
# sed -i “” "s/%master-port%/${MASTER_PORT}/" redis-slave/redis-slave.conf
# buid redis-slave images
docker build -t lyudmila/redis-slave:v1.0 redis-slave/.
# kubernetes starts redis slaves
kubectl create -f redis-slave/redis-slave-service.yml
kubectl create -f redis-slave/redis-slave-deployment.yml
# buid backend images
docker build -t lyudmila/python-redis-backend:v1.0 backend/.
# kubernetes starts backend
kubectl create -f backend/backend-service.yml
kubectl create -f backend/backend-deployment.yml
# buid frontend images
docker build -t lyudmila/frontend:v1.0 frontend/.
# kubernetes starts frontend
# install express ejs redis

# docker starts containers
docker run -d -p 32769:6379 lyudmila/redis-master:v1.0
docker run -d -p 32780:6379 lyudmila/redis-slave:v1.0
docker run -d lyudmila/python-redis-backend:v1.0
docker run -d lyudmila/frontend:v1.0
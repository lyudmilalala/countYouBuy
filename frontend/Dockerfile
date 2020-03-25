FROM node:latest
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN mkdir data
RUN cnpm install express ejs redis --save
RUN cp -r node_modules/ data/node_modules
RUN cp package.json data/package.json
RUN rm -r node_modules/
RUN rm package.json
COPY frontend.js /data/frontend.js
VOLUME /data
CMD [ "node", "/data/frontend.js"]
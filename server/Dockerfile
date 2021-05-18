# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
FROM node:14

RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN chmod 755 /usr/local/bin/dockerize

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
COPY . .
#COPY prisma ./prisma/

RUN npm install -g prisma1
#RUN prisma1 deploy;

#RUN dockerize -wait http://prisma:4466 -timeout 300s -wait-retry-interval 2s
EXPOSE 5000
CMD [ "npm", "start" ]
#CMD ["prisma1","deploy"]

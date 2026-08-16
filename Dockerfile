FROM registry.access.redhat.com/ubi8/nodejs-18:latest

WORKDIR /opt/app-root/src

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 3001

CMD ["node", "server.js"]

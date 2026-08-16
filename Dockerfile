# Install the app dependencies in a full Node docker image
FROM registry.access.redhat.com/ubi8/nodejs-18:latest

# Copy package files
COPY package.json package-lock.json* ./

# Make the files accessible to the OpenShift user
RUN chgrp -R 0 /opt/app-root/src && \
    chmod -R g=u /opt/app-root/src

# Install dependencies
RUN npm install

# Runtime image
FROM registry.access.redhat.com/ubi8/nodejs-18-minimal:latest

# Copy dependencies
COPY --from=0 /opt/app-root/src/node_modules /opt/app-root/src/node_modules

# Copy application
COPY . /opt/app-root/src

ENV NODE_ENV production
ENV PORT 3001

CMD ["node", "server.js"]

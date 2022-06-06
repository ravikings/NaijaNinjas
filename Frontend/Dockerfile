# pull official base image
FROM node:14-alpine

# set working directory
WORKDIR /app

# Fixing permission issues
RUN chown node:node /app
USER node

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# # install app dependencies
COPY package.json .
COPY yarn.lock .

RUN yarn

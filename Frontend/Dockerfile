FROM node

WORKDIR /app/frontend
COPY package.json /app/frontend
COPY package-lock.json /app/frontend

RUN npm install -g npm@8.3.0

COPY . /app/frontend/

EXPOSE 3000
WORKDIR /app/frontend
CMD ["npm", "start"]
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./dist_old ./
COPY .env ./
EXPOSE 7000
CMD ["npm", "run", "start"]

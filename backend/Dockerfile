
#Build stage
FROM node:20 
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 7000

CMD ["node", "dist_old/index.js"]

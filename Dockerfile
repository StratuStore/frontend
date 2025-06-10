FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT ["sh", "-c", "npm run build"]
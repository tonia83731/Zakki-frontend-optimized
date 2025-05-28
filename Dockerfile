FROM node:18-alpine AS builder

WORKDIR /app

COPY .env ./
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --chown=node:node --from=builder /app/dist /app/dist

EXPOSE 5173

CMD [ "serve", "-s", "dist", "-l", "5173" ]
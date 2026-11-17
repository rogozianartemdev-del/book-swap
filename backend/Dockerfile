# Базовый слой с зависимостями
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install


FROM base AS dev
COPY . .
CMD ["npm", "run", "dev"]


FROM base AS prod
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
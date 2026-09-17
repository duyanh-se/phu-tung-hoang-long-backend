FROM node:22-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Prisma 7 loads the datasource URL while generating the client.
ENV DATABASE_URL=postgresql://build:build@localhost:5432/build
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["sh", "-c", "npm run prisma:deploy && npm run start:prod"]
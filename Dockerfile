FROM node:20-alpine AS builder

WORKDIR /src

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build


FROM node:20-alpine

WORKDIR /src

COPY --from=builder /src/build ./build
COPY --from=builder /src/node_modules ./node_modules
COPY --from=builder /src/package*.json ./

RUN npm install --only=production


RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 33333

ENV NODE_ENV=production

CMD ["node", "build/server.js"]
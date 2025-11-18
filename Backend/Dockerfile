FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
COPY shared ./shared
COPY tsconfig.json ./
COPY Backend ./Backend

RUN cd shared && npm install && npm run build
RUN cd Backend && npm install && npm run build


FROM node:18 AS runner

WORKDIR /app

COPY --from=builder /app/Backend/dist ./dist
COPY Backend/package.json ./
RUN npm install --omit=dev

EXPOSE 3001

CMD [ "node", "dist/app.js" ]

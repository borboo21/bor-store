FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY Frontend ./Frontend
COPY shared ./shared

RUN cd shared && npm install && npm run build
RUN cd Frontend && npm install && npm run build


FROM nginx:stable-alpine AS runner
COPY --from=builder /app/Frontend/dist /usr/share/nginx/html
COPY Frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]

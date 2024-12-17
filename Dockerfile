FROM node:18


COPY . .


WORKDIR /src
RUN npm i
RUN npm run build

WORKDIR /Backend
RUN npm i

EXPOSE  3001

CMD ["node","app.js"]

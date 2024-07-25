FROM node:alpine

WORKDIR /usr/lms-server

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/server.js"]
FROM node:alpine

WORKDIR /usr/lms-server

COPY package.json .

RUN npm install

ENV NODE_ENV production

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
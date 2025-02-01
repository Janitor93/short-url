FROM node:20
WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE ${PORT}

RUN yarn build
CMD [ "yarn", "run", "start:dev" ]

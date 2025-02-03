FROM node:20.11
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

EXPOSE ${PORT}

RUN yarn build
CMD [ "yarn", "run", "start:dev" ]

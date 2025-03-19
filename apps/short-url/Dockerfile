FROM node:20.11
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
RUN yarn install

COPY apps/short-url apps/short-url
COPY libs libs

EXPOSE ${PORT}

RUN yarn build
CMD [ "yarn", "run", "start:dev" ]

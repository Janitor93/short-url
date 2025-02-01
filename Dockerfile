FROM node:20

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

CMD [ "yarn", "run", "start" ]

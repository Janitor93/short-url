FROM node:20.11
RUN npm install -g @nestjs/cli

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
RUN yarn install

COPY apps/ apps/
COPY libs libs

EXPOSE ${PORT}

RUN yarn build
CMD ["nest", "start", "auth", "--watch"]

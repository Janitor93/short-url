export const appConfig = {
  app: {
    url: process.env.URL,
    externalPort: Number(process.env.EXTERNAL_PORT),
    internalPort: Number(process.env.INTERNAL_PORT),
  },
  userApp: {
    url: process.env.USER_URL,
    port: Number(process.env.USER_PORT),
  },
  jwt: {
    secretKey: process.env.SECRET_KEY,
    expiresIn: '10m',
  },
  cache: {
    expiresIn: '10d',
    namespace: 'refresh',
  },
  logger: {
    namespace: 'auth',
  }
};

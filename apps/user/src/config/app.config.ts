export const appConfig = {
  app: {
    internalPort: Number(process.env.INTERNAL_PORT),
    externalPort: Number(process.env.EXTERNAL_PORT),
    url: process.env.URL,
  },
  jwt: {
    secretKey: process.env.SECRET_KEY,
  },
  auth: {
    url: process.env.AUTH_URL,
    port: process.env.AUTH_PORT,
  },
  logger: {
    namespace: 'user',
  },
};

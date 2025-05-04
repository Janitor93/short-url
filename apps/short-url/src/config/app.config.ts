export const appConfig = {
  app: {
    internalPort: Number(process.env.INTERNAL_PORT),
    externalPort: Number(process.env.EXTERNAL_PORT),
  },
  logger: {
    namespace: 'url',
  },
  cache: {
    namespace: 'url',
  },
};

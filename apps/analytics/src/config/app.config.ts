export const appConfig = {
  app: {
    url: process.env.URL,
    externalPort: Number(process.env.EXTERNAL_PORT),
    internalPort: Number(process.env.INTERNAL_PORT),
  },
  logger: {
    namespace: 'analytics',
  },
  pagination: {
    limit: 20,
  },
};

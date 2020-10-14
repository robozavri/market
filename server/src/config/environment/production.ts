export default {
  port: 4002,

  url: {
    scheme: 'http',
    host: 'core.com',
    api: 'core.com',
  },

  mongo: {
    uri: `mongodb://localhost:27017/market`,
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  },
  resourceUrl: 'https://globalmarket.ge',
  winstonConsole: false,

  // seedDB: true,
};

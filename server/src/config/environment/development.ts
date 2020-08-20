export default {
  port: 4002,

  url: {
    scheme: 'http',
    host: 'localhost:4000',
    api: 'localhost:4002',
  },

  mongo: {
    uri: `mongodb://localhost:27017/market`,
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
    },
  },

  resourceUrl: 'http://localhost:4002',

  // seedDB: true,
};

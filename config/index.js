module.exports = {
  routes: {
    ...require('./routes'),
  },
  connection: {
    ...require('./typeorm'),
  },
  entities: {
    ...require('./entities'),
  },
};

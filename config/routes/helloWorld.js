module.exports = {
  helloWorldRoute: {
    path: '/',
    methods: ['GET'],
    callback: () => ({
      status: 200,
      body: 'Hello world!',
    }),
  },
};

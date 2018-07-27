const hadron = require('@brainhubeu/hadron-core').default;

const hadronExpress = require('@brainhubeu/hadron-express');
const hadronTypeorm = require('@brainhubeu/hadron-typeorm');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const config = require('./config');

const port = process.env.PORT || 8080;

const dependencies = [
  hadronExpress,
  hadronTypeorm,
];

hadron(app, dependencies, config).then(() => {
  app.listen(port, () =>
    // eslint-disable-next-line no-console
    console.log(`Listening on http://localhost:${port}`),
  );
});

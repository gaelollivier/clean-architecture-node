const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { connectDb } = require('./infrastructure/db');

const user = require('./user');
const shopping = require('./shopping');

(async () => {
  const dbClient = await connectDb();

  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  // setup a middleware to inject services into every request
  app.use((req, _res, next) => {
    req.services = {
      user: user.getServices({ dbClient }),
      shopping: shopping.getServices({ dbClient }),
    };
    next();
  });

  // Before defining modules routes, this is where we would define middlewares for:
  // - auth
  // - error handling
  // - logging
  // - ...

  // add a dummy middleware that populates fake auth data
  app.use((req, _res, next) => {
    req.currentUser = {
      _id: '42',
      type: 'ADMIN',
    };
    next();
  });

  user.setupREST(app);
  shopping.setupREST(app);

  const port = process.env.PORT || 5000;
  app.listen(port);

  console.log(`Listening on port ${port}`);
})();

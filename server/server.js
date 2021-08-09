const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes');

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Routes
app.use(routes);

// Start the API server
app.listen(PORT, () => console.log(`API Server listening on PORT ${PORT}!`));

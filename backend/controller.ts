import express from 'express';

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Allow CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Define a route handler for GET requests on the /api/my-endpoint endpoint
app.get('/api/my-endpoint', (req, res) => {
  // Send a JSON response with a message property
  res.json({ message: 'Hello from the backend!' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

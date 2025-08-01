import express from 'express';

const app = express();
const PORT = 5000;

// Middleware (optional): parse JSON bodies
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('Service-Patient API is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

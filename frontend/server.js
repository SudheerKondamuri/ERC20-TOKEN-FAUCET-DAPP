// frontend/server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

// Mandatory Health Endpoint for Evaluation
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Support client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../public')));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from AI Chatbot!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
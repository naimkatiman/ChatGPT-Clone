import express from 'express';
import path from 'path';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.json());

// Initialize OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
    console.log('Received chat request:', req.body);
    try {
        const { message } = req.body;
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            max_tokens: 150
        });
        console.log('OpenAI response:', completion.choices[0].message.content);
        res.json({ reply: completion.choices[0].message.content?.trim() });
    } catch (error) {
        console.error('Error in chat request:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

const server = app.listen(0, () => {
    const address = server.address();
    const port = typeof address === 'string' ? address : address?.port;
    console.log(`Server running at http://localhost:${port}`);
});
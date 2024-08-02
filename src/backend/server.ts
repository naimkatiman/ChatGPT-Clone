import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import path from 'path';
import OpenAI from 'openai';

// Initialize Firebase Admin SDK
admin.initializeApp();

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.json());

// Initialize OpenAI with the API key from Firebase config
const openai = new OpenAI({
    apiKey: functions.config().openai.key,
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            max_tokens: 150
        });
        res.json({ reply: completion.choices[0].message.content?.trim() });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// Export the Express app as a Firebase Cloud Function
export const chatbot = functions.https.onRequest(app);
import * as functions from 'firebase-functions';
import { OpenAI } from 'openai';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
admin.initializeApp();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: functions.config().openai.key
});

// Interface for chat message
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Interface for chat history
interface ChatHistory {
  messages: ChatMessage[];
}

// Function to get chat history
async function getChatHistory(userId: string): Promise<ChatHistory> {
  try {
    const doc = await admin.firestore().collection('chatHistories').doc(userId).get();
    if (doc.exists) {
      return doc.data() as ChatHistory;
    }
    return { messages: [] };
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return { messages: [] };
  }
}

// Function to update chat history
async function updateChatHistory(userId: string, history: ChatHistory): Promise<void> {
  try {
    await admin.firestore().collection('chatHistories').doc(userId).set(history);
  } catch (error) {
    console.error('Error updating chat history:', error);
  }
}

// Main chatbot function
export const chatbot = functions.https.onRequest(async (request, response) => {
  try {
    console.log('Received request:', request.body);

    const { message, userId } = request.body;

    if (!message || typeof message !== 'string') {
      throw new Error('Invalid or missing message');
    }

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid or missing userId');
    }

    // Get chat history
    const history = await getChatHistory(userId);

    // Add user message to history
    history.messages.push({ role: 'user', content: message });

    // Prepare messages for OpenAI
    const aiMessages = history.messages.slice(-5); // Only use last 5 messages

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: aiMessages,
      max_tokens: 150
    });

    console.log('OpenAI response:', completion.choices[0].message);

    const aiReply = completion.choices[0].message.content || '';

    // Add AI response to history
    history.messages.push({ role: 'assistant', content: aiReply });

    // Update chat history
    await updateChatHistory(userId, history);

    response.json({ reply: aiReply });
  } catch (error) {
    console.error('Error processing request:', error);
    
    if (error instanceof Error) {
      response.status(500).json({ 
        error: 'An error occurred while processing your request.',
        details: error.message
      });
    } else {
      response.status(500).json({ 
        error: 'An unexpected error occurred.',
        details: 'Unknown error type'
      });
    }
  }
});

// Function to clear chat history
export const clearChatHistory = functions.https.onRequest(async (request, response) => {
  try {
    const { userId } = request.body;

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid or missing userId');
    }

    await admin.firestore().collection('chatHistories').doc(userId).delete();

    response.json({ message: 'Chat history cleared successfully' });
  } catch (error) {
    console.error('Error clearing chat history:', error);
    response.status(500).json({ 
      error: 'An error occurred while clearing chat history.',
      details: error instanceof Error ? error.message : 'Unknown error type'
    });
  }
});
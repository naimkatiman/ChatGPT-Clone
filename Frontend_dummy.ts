// Assuming you're using a modern framework like React with hooks

import { useState, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Generate a random userId for this session
    setUserId(Math.random().toString(36).substring(7));
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('https://chatgpt-ciplak.web.app/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input, userId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const aiMessage: Message = { role: 'assistant', content: data.reply };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = { 
        role: 'assistant', 
        content: 'Sorry, there was an error processing your request.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const clearHistory = async () => {
    try {
      await fetch('https://chatgpt-ciplak.web.app/api/clearChatHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      setMessages([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index} className={msg.role}>
          {msg.content}
        </div>
      ))}
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
      <button onClick={clearHistory}>Clear History</button>
    </div>
  );
};

export default ChatComponent;
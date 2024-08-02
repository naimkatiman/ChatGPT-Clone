// ChatInterface.tsx

import React, { useState, useEffect } from 'react';
import { ChatMessage, ChatSession } from './types';
import { sendChatMessage, getChatSession } from './api.service';
import { createChatMessage, validateMessage, truncateHistory } from './utils';

interface ChatInterfaceProps {
  sessionId: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ sessionId }) => {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchChatSession();
  }, [sessionId]);

  async function fetchChatSession() {
    const response = await getChatSession(sessionId);
    if (response.success && response.data) {
      setSession(response.data);
    } else {
      console.error('Failed to fetch chat session');
    }
  }

  async function handleSendMessage() {
    if (!validateMessage(input) || !session) return;

    setIsLoading(true);
    const userMessage = createChatMessage('user', input);
    setSession(prev => prev ? {
      ...prev,
      messages: [...prev.messages, userMessage]
    } : null);
    setInput('');

    const response = await sendChatMessage(sessionId, input);
    setIsLoading(false);

    if (response.success && response.data) {
      setSession(prev => prev ? {
        ...prev,
        messages: truncateHistory([...prev.messages, response.data])
      } : null);
    } else {
      console.error('Failed to send message');
    }
  }

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chat-interface">
      <div className="message-list">
        {session.messages.map(message => (
          <div key={message.id} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={isLoading}
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
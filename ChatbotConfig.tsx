// ChatbotConfig.tsx

import React, { useState } from 'react';
import { ChatbotConfig } from './types';
import { updateChatbotConfig } from './api.service';

const ChatbotConfigComponent: React.FC = () => {
  const [config, setConfig] = useState<ChatbotConfig>({
    model: 'gpt-3.5-turbo',
    maxTokens: 150,
    temperature: 0.7
  });

  async function handleUpdateConfig() {
    const response = await updateChatbotConfig(config);
    if (response.success) {
      alert('Configuration updated successfully');
    } else {
      alert('Failed to update configuration');
    }
  }

  return (
    <div className="chatbot-config">
      <h2>Chatbot Configuration</h2>
      <div>
        <label>
          Model:
          <input
            type="text"
            value={config.model}
            onChange={(e) => setConfig(prev => ({ ...prev, model: e.target.value }))}
          />
        </label>
      </div>
      <div>
        <label>
          Max Tokens:
          <input
            type="number"
            value={config.maxTokens}
            onChange={(e) => setConfig(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
          />
        </label>
      </div>
      <div>
        <label>
          Temperature:
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={config.temperature}
            onChange={(e) => setConfig(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
          />
        </label>
      </div>
      <button onClick={handleUpdateConfig}>Update Configuration</button>
    </div>
  );
};

export default ChatbotConfigComponent;
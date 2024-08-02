// api.service.ts

import { ChatMessage, ChatSession, ApiResponse, ChatbotConfig } from './types';

const API_BASE_URL = 'https://chatgpt-ciplak.web.app/api';

export async function sendChatMessage(sessionId: string, message: string): Promise<ApiResponse<ChatMessage>> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId, message }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return { success: true, data: data.message };
  } catch (error) {
    console.error('Error sending chat message:', error);
    return { success: false, error: 'Failed to send message' };
  }
}

export async function getChatSession(sessionId: string): Promise<ApiResponse<ChatSession>> {
  try {
    const response = await fetch(`${API_BASE_URL}/session/${sessionId}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return { success: true, data: data.session };
  } catch (error) {
    console.error('Error fetching chat session:', error);
    return { success: false, error: 'Failed to fetch chat session' };
  }
}

export async function updateChatbotConfig(config: Partial<ChatbotConfig>): Promise<ApiResponse<ChatbotConfig>> {
  try {
    const response = await fetch(`${API_BASE_URL}/config`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return { success: true, data: data.config };
  } catch (error) {
    console.error('Error updating chatbot config:', error);
    return { success: false, error: 'Failed to update chatbot configuration' };
  }
}
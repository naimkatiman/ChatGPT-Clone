// types.ts

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
  }
  
  export interface ChatSession {
    id: string;
    userId: string;
    messages: ChatMessage[];
    createdAt: number;
    updatedAt: number;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  export interface ChatbotConfig {
    model: string;
    maxTokens: number;
    temperature: number;
  }
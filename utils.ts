// utils.ts

import { ChatMessage, ChatSession } from './types';

export function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function validateMessage(message: string): boolean {
  return message.trim().length > 0 && message.length <= 500;
}

export function createChatMessage(role: 'user' | 'assistant', content: string): ChatMessage {
  return {
    id: generateUniqueId(),
    role,
    content,
    timestamp: Date.now()
  };
}

export function createNewSession(userId: string): ChatSession {
  const now = Date.now();
  return {
    id: generateUniqueId(),
    userId,
    messages: [],
    createdAt: now,
    updatedAt: now
  };
}

export function truncateHistory(messages: ChatMessage[], maxMessages: number = 50): ChatMessage[] {
  return messages.slice(-maxMessages);
}
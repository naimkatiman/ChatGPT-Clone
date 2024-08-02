"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const clearButton = document.getElementById('clear-chat');
    const typingIndicator = document.getElementById('typing-indicator');
    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = message;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    function showTypingIndicator() {
        typingIndicator.classList.remove('d-none');
    }
    function hideTypingIndicator() {
        typingIndicator.classList.add('d-none');
    }
    function sendMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            const message = userInput.value.trim();
            if (message) {
                addMessage(message, true);
                userInput.value = '';
                showTypingIndicator();
                try {
                    const response = yield fetch('/api/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message })
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = yield response.json();
                    hideTypingIndicator();
                    addMessage(data.reply, false);
                }
                catch (error) {
                    console.error('Error:', error);
                    hideTypingIndicator();
                    addMessage('Sorry, there was an error processing your request.', false);
                }
            }
        });
    }
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    clearButton.addEventListener('click', () => {
        chatContainer.innerHTML = '';
    });
});

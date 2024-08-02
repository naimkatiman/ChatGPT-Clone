"use strict";
document.addEventListener('DOMContentLoaded', () => {
    var _a;
    const chatbotContainer = (_a = document.getElementById('chatbot-container')) !== null && _a !== void 0 ? _a : document.body;
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = message;
        chatbotContainer === null || chatbotContainer === void 0 ? void 0 : chatbotContainer.appendChild(messageDiv);
        chatbotContainer === null || chatbotContainer === void 0 ? void 0 : chatbotContainer.scrollTo(0, chatbotContainer.scrollHeight);
    }
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatbotContainer === null || chatbotContainer === void 0 ? void 0 : chatbotContainer.appendChild(typingDiv);
        chatbotContainer === null || chatbotContainer === void 0 ? void 0 : chatbotContainer.scrollTo(0, chatbotContainer.scrollHeight);
        return typingDiv;
    }
    function sendMessage() {
        var _a;
        const message = (_a = userInput === null || userInput === void 0 ? void 0 : userInput.value.trim()) !== null && _a !== void 0 ? _a : '';
        if (message) {
            addMessage(message, true);
            if (userInput)
                userInput.value = '';
            const typingIndicator = addTypingIndicator();
            fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            })
                .then(response => response.json())
                .then(data => {
                typingIndicator.remove();
                addMessage(data.reply, false);
            })
                .catch(error => {
                console.error('Error:', error);
                typingIndicator.remove();
                addMessage('Sorry, there was an error processing your request.', false);
            });
        }
    }
    sendButton === null || sendButton === void 0 ? void 0 : sendButton.addEventListener('click', sendMessage);
    userInput === null || userInput === void 0 ? void 0 : userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    // Add a welcome message
    setTimeout(() => {
        addMessage("Hello! I'm your AI assistant. How can I help you today?", false);
    }, 500);
});

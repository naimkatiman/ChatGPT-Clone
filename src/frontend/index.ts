document.addEventListener('DOMContentLoaded', () => {
    const chatbotContainer = document.getElementById('chatbot-container') ?? document.body;
    const sendButton = document.getElementById('send-button') as HTMLButtonElement;
    const userInput = document.getElementById('user-input') as HTMLInputElement;    

    function addMessage(message: string, isUser: boolean) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = message;
        chatbotContainer?.appendChild(messageDiv);
        chatbotContainer?.scrollTo(0, chatbotContainer.scrollHeight);
    }
    
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatbotContainer?.appendChild(typingDiv);
        chatbotContainer?.scrollTo(0, chatbotContainer.scrollHeight);
        return typingDiv;
    }

    function sendMessage() {
        const message = userInput?.value.trim() ?? '';
        if (message) {
            addMessage(message, true);
            if (userInput) userInput.value = '';
            
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

    sendButton?.addEventListener('click', sendMessage);
    userInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
    });

    // Add a welcome message
    setTimeout(() => {
        addMessage("Hello! I'm your AI assistant. How can I help you today?", false);
    }, 500);
});
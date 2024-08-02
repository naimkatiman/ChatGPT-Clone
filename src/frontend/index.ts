document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container') as HTMLDivElement;
    const userInput = document.getElementById('user-input') as HTMLInputElement;
    const sendButton = document.getElementById('send-button') as HTMLButtonElement;
    const clearButton = document.getElementById('clear-chat') as HTMLButtonElement;
    const typingIndicator = document.getElementById('typing-indicator') as HTMLDivElement;

    function addMessage(message: string, isUser: boolean) {
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

    async function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            showTypingIndicator();

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                hideTypingIndicator();
                addMessage(data.reply, false);
            } catch (error) {
                console.error('Error:', error);
                hideTypingIndicator();
                addMessage('Sorry, there was an error processing your request.', false);
            }
        }
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
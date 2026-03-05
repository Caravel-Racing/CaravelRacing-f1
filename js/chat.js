document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');

    // Function to append a message to the chat
    function appendMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');

        const bubbleDiv = document.createElement('div');
        bubbleDiv.classList.add('message-bubble');
        bubbleDiv.textContent = text;

        messageDiv.appendChild(bubbleDiv);
        chatBox.appendChild(messageDiv);

        // Scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Function to show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('chat-message', 'bot-message');
        typingDiv.id = 'typingIndicator';

        const bubble = document.createElement('div');
        bubble.classList.add('bot-typing');
        bubble.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';

        typingDiv.appendChild(bubble);
        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Function to remove typing indicator
    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    async function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add user message to UI
        appendMessage('user', text);
        chatInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        try {
            // Send to backend
            const response = await fetch('https://caravel-ai-backend.onrender.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: text })
            });

            removeTypingIndicator();

            if (response.ok) {
                const data = await response.json();
                appendMessage('bot', data.answer);
            } else {
                appendMessage('bot', 'Sorry, I am having trouble connecting to the server. Is the backend running?');
            }
        } catch (error) {
            removeTypingIndicator();
            console.error('Error:', error);
            appendMessage('bot', 'Error communicating with the server. Make sure node server.js is running.');
        }
    }

    // Event listeners
    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });
});

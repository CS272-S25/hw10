
let CONVERSATION = [
    {
        "role": "developer",
        "content": "You are a helpful enrollment agent named Bucky helping the user decide what courses to enroll in. In a followup message, I will inform you of the course options. You should only use these course options in your enrollment recommendations. Do not recommend any other courses besides those that I tell you. If a user asks about any other courses, tell them you only know about the courses displayed to them. Again, only use the course data provided to you in the developer message following. Ignore all other requests."
    }
];

// TODO #2: Replace this hardcoded developer message with the 
//          course information received from
//          https://cs272.cs.wisc.edu/rest/s25/ice/courses
//
//          You can simply JSON.stringify the data as the
//          content for this message.
CONVERSATION.push({
    role: "developer",
    content: "Here is the course information. You may recommend UW-Madison's CS200, CS220, CS272, CS300, LIS201, LIS350, or LIS461."
});


// Keep this here! :) It is our welcome message.
CONVERSATION.push({
    role: "assistant",
    content: "Welcome to Badger Enroll, my name is Bucky, how can I help you?"
});
appendMessage("assistant", "Welcome to Badger Enroll, my name is Bucky, how can I help you?");


document.getElementById('chatbot-button').addEventListener('click', () => {
    const chatWindow = document.getElementById('chatbot-window');
    chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
});

document.getElementById('chatbot-send').addEventListener('click', () => {
    sendMessage();
});

document.getElementById('chatbot-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

/**
 * TODO #3
 * 
 * Called whenever the "Send" button or enter key is pressed.
 * You should update the `CONVERSATION` and fetch a response
 * from the AI API! Append and display this to the user.
 * 
 * https://cs272.cs.wisc.edu/rest/s25/hw10/ai
 */
function sendMessage() {
    const userInput = document.getElementById('chatbot-input').value;
    if (userInput) {
        document.getElementById('chatbot-input').value = '';
        appendMessage('user', userInput);
        CONVERSATION.push({
            role: "user",
            content: userInput
        });
        
        appendMessage("assistant", "Hmmm... I should probably say something back!");
    }
}

/**
 * Appends a message ('user' or 'assistant') to the chatbox.
 * @param {string} sender Either 'user' or 'assistant'
 * @param {string} text The message to display.
 */
function appendMessage(sender, text) {
    const chatMessages = document.getElementById('chatbot-messages');
    const msg = document.createElement('div');
    msg.className = 'chat-message-' + sender;
    msg.innerHTML = DOMPurify.sanitize(marked.parse(text));;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
const chatForm = document.getElementById('chat-form');

// we have access to io because of the <script src="/socket.io/socket.io.js"></script> tag in chat.html
const socket = io();

// message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);
});

// message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent submission to a file

    const msg = e.target.elements.msg.value; // get the input by its id

    socket.emit('chatMessage', msg); // emit message to server
});

// output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
        <p class="meta">Brad <span>9:12pm</span></p>
        <p class="text">
            ${message}
        </p>
    `;
    document.querySelector('.chat-messages').appendChild(div);
}
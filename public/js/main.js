// we have access to io because of the <script src="/socket.io/socket.io.js"></script> tag in chat.html
const socket = io();

socket.on('message', message => {
    console.log(message);
});
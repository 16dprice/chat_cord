const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app); // need this in order to use socket.io
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {

    // Welcome current user
    socket.emit('message', 'Welcome to ChatCord!'); // emits to client that is connecting

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat'); // broadcasts to everyone except client that is connecting

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat.'); // emits to all clients
    });

});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

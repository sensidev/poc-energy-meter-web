const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const port = process.env.PORT || 8000;
const index = require('./routes/index');

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

const generateChannels = require('./mock');

const emit = async socket => {
    try {
        const channels = generateChannels(2);
        socket.emit("channels", channels);
    } catch (err) {
        console.log('Error: ', error);
    }
}


let interval;
io.on('connection', socket => {
    console.log('New client connected');
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => emit(socket), 3000);
    socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(port, () => console.log('Listening on port', port));
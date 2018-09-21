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

let duration = 5000;
const emitContinously = socket => {
    setTimeout(() => {
        const channels = generateChannels(2);
        socket.emit('channels', channels);
        emitContinously(socket);
    }, duration);
};

io.on('connection', socket => {
    setTimeout(() => emitContinously(socket), duration);

    socket.on('seconds', seconds => {
        if (seconds * 1000 !== duration) {
            duration = seconds * 1000;
        }
    });

    exit = false;
});

server.listen(port, () => console.log('Listening on port', port));

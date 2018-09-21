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

let interval;
let duration;

const emit = socket => {
    const channels = generateChannels(2);
    socket.emit('channels', channels);
};

io.on('connection', socket => {
    emit(socket);
    interval = setInterval(() => {
        emit(socket);
    }, 5000);

    socket.on('seconds', seconds => {
        if (seconds * 1000 !== duration) {
            clearInterval(interval);
            duration = seconds * 1000;
            emit(socket);
            interval = setInterval(() => {
                emit(socket);
            }, duration);
        }
    });

    socket.on('disconnect', () => {
        clearInterval(interval);
        console.log('Client disconnected');
    });
});

server.listen(port, () => console.log('Listening on port', port));

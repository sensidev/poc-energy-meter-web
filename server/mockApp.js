const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const port = process.env.PORT || 8000;
const index = require('./routes/index');

const mockApp = express();
mockApp.use(index);

const server = http.createServer(mockApp);

const io = socketIo(server);

const generateChannels = require('./mock');

const EMIT_INTERVAL = 5000;
const DATA_POINTS_PER_INTERVAL = 1;
const NUMBER_OF_CHANNELS = 4;

let interval;

const emit = (socket, dataPoints) => {
    const channels = generateChannels(NUMBER_OF_CHANNELS, dataPoints);
    socket.emit('channels', channels);
};

io.on('connection', socket => {
    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        emit(socket, DATA_POINTS_PER_INTERVAL);
    }, EMIT_INTERVAL);

    socket.on('disconnect', () => {
        clearInterval(interval);
        console.log('Client disconnected');
    });
});

server.listen(port, () => console.log('Listening on port', port));

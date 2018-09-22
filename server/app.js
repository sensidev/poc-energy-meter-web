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
/*
* The interval at which data is sent over the socket
*/
let EMIT_INTERVAL = 5000;
/*
* Number of channels generated
*/
let NUMBER_OF_CHANNELS = 4;

const emit = (socket, dataPoints, initial) => {
    const channels = generateChannels(NUMBER_OF_CHANNELS, dataPoints, initial);
    socket.emit('channels', channels);
};

io.on('connection', socket => {
    if (interval) {
        clearInterval(interval);
    }

    const dataPoints = EMIT_INTERVAL / 1000;

    emit(socket, 60, true);

    interval = setInterval(() => {
        emit(socket, dataPoints, false);
    }, EMIT_INTERVAL);

    socket.on('disconnect', () => {
        clearInterval(interval);
        console.log('Client disconnected');
    });
});

server.listen(port, () => console.log('Listening on port', port));

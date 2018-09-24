const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const deviceModule = require('aws-iot-device-sdk').device;
const awsCmdLineProcess = require('aws-iot-device-sdk/examples/lib/cmdline');

const subscribeTopic = "$aws/things/EnergyRestart0/shadow/update/accepted";

const serverPort = process.env.PORT || 8000;
const index = require('./routes/index');

const mqttApp = express();
mqttApp.use(index);

const server = http.createServer(mqttApp);

const DIGITS = 3;

function runServer() {
    server.listen(serverPort, () => console.log('Listening on port', serverPort));
}

/**
 * Process each channel by:
 *  - adding (x,y) pair for each point.
 *  - round numbers.
 * @param channel the channel to process.
 * @param now current date.
 */
function getProcessChannel(channel, now) {
    const points_count = channel['rms_current_data_points'].length;
    const step = 1000;
    const timestamp = now.getTime();

    for (let p = 0; p < points_count; p++) {
        channel['rms_current_data_points'][p] = {
            'x': timestamp + p * step,
            'y': round(channel['rms_current_data_points'][p], DIGITS)
        }
    }

    channel['energy'] = round(channel['energy'], DIGITS);
    channel['power'] = round(channel['power'], DIGITS);
    channel['voltage'] = round(channel['voltage'], DIGITS);
    channel['rms_min_current'] = round(channel['rms_min_current'], DIGITS);
    channel['rms_avg_current'] = round(channel['rms_avg_current'], DIGITS);
    channel['rms_max_current'] = round(channel['rms_max_current'], DIGITS);

    return channel;
}

function round(value, digits) {
    return +value.toFixed(digits);
}

function mqttSubscribe(args) {
    const device = deviceModule({
        keyPath: args.privateKey,
        certPath: args.clientCert,
        caPath: args.caCert,
        clientId: args.clientId,
        region: args.region,
        baseReconnectTimeMs: args.baseReconnectTimeMs,
        keepalive: args.keepAlive,
        protocol: args.Protocol,
        port: args.Port,
        host: args.Host,
        debug: args.Debug
    });

    const socket = socketIo(server, {path: '/ws'});

    socket.on('connection', s => {
        console.log('SocketIO connected!');
    });

    device.subscribe(subscribeTopic);

    device.on('connect', function () {
        console.log('connected');
    });
    device.on('close', function () {
        console.log('closeed');
    });
    device.on('reconnect', function () {
        console.log('reconnected');
    });
    device.on('offline', function () {
        console.log('offline');
    });
    device.on('error', function (error) {
        console.log('error', error);
    });
    device.on('message', function (topic, payload) {
        const now = new Date();
        const payloadStr = payload.toString();
        const payloadJson = JSON.parse(payloadStr);

        console.log('message received for topic:', topic, payloadStr);

        let channels = (((payloadJson || {}).state || {}).reported || {}).channels || [];

        for (let c = 0; c < channels.length; c++) {
            channels[c] = getProcessChannel(channels[c], now);
        }

        socket.emit('channels', channels);
    });
}

module.exports = awsCmdLineProcess;

if (require.main === module) {
    runServer();
    awsCmdLineProcess('Connect to the AWS IoT service and subscribe to a topic using MQTT',
        process.argv.slice(2), mqttSubscribe);
    console.log('Args:', process.argv.slice(2));
}

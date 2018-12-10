const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const deviceModule = require('aws-iot-device-sdk').device;
const awsCmdLineProcess = require('aws-iot-device-sdk/examples/lib/cmdline');

const subscribeTopic = "up/device/processed/payload/+/customer/+";

const serverPort = process.env.PORT || 8000;
const index = require('./routes/index');

const mqttApp = express();
mqttApp.use(index);

const server = http.createServer(mqttApp);

const io = socketIo(server, {path: '/ws'});


function runServer() {
    server.listen(serverPort, () => console.log('Listening on port', serverPort));
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

    io.on('connection', s => {
        console.log('SocketIO connected!');
    });

    device.subscribe(subscribeTopic);

    device.on('connect', function () {
        console.log('Connected');
    });
    device.on('close', function () {
        console.log('Closed');
    });
    device.on('reconnect', function () {
        console.log('Reconnected');
    });
    device.on('offline', function () {
        console.log('Offline');
    });
    device.on('error', function (error) {
        console.log('Error', error);
    });
    device.on('message', function (topic, payload) {
        const payloadStr = payload.toString();
        const payloadJson = JSON.parse(payloadStr);

        console.log('Message received for topic:', topic, payloadStr);

        io.emit('payload', payloadJson || {});
    });
}

module.exports = awsCmdLineProcess;

if (require.main === module) {
    runServer();
    awsCmdLineProcess('Connect to the AWS IoT service and subscribe to a topic using MQTT',
        process.argv.slice(2), mqttSubscribe);
    console.log('Args:', process.argv.slice(2));
}

import { STATUS } from './';

export const mapDebuggingMeter = ({ data, timestamp }) => {
    return {
        timestamp: new Date(timestamp * 1000),
        values: [
            {
                key: 'CBC',
                title: 'Core boot count',
                value: data.debug.coreBootCount,
                status: STATUS.Default
            },
            {
                key: 'SBC',
                title: 'Sensor boot count',
                value: data.debug.sensorBootCount,
                status: STATUS.Default
            },
            {
                key: 'I2CF',
                title: 'I2C fails',
                value: data.debug.i2cFails,
                status: STATUS.Default
            },
            {
                key: 'I2COP',
                title: 'I2C offline period',
                value: data.debug.i2cOfflinePeriod,
                status: STATUS.Default
            },
            {
                key: 'MQTTPF',
                title: 'MQTT pub fails',
                value: data.debug.mqttPubFails,
                status: STATUS.Default
            },
            {
                key: 'HFS',
                title: 'Heap free size',
                value: data.debug.heapFreeSize,
                status: STATUS.Default
            },
            {
                key: 'RDF',
                title: 'Register data fails',
                value: data.debug.registerDataFails,
                status: STATUS.Default
            },
            {
                key: 'QS',
                title: 'Queue size',
                value: data.debug.queueSize,
                status: STATUS.Default
            }
        ]
    };
};

export const getDebuggingUnit = (key, value) => {
    return value;
};

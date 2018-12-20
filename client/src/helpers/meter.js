import moment from 'moment';

import { generateRandom, DIGITS, STATUS } from './';

const NUMBER_OF_BARS = 34;
const NUMBER_OF_METER_BARS = 300;

export const generate3PhaseMeter = () => {
    const samples = new Array(60);
    for (let index = 0; index < 60; index++) {
        samples[index] = {
            temp: +generateRandom(-5, 5).toFixed(DIGITS),
            Vref: +generateRandom(0, 5).toFixed(DIGITS),
            R_Pavg: +generateRandom(0, 1).toFixed(DIGITS),
            R_Irms: +generateRandom(0, 1).toFixed(DIGITS),
            R_Vrms: +generateRandom(0, 1).toFixed(DIGITS),
            R_Pfact: +generateRandom(0, 1).toFixed(DIGITS),
            S_Pavg: +generateRandom(0, 1).toFixed(DIGITS),
            S_Irms: +generateRandom(0, 1).toFixed(DIGITS),
            S_Vrms: +generateRandom(0, 1).toFixed(DIGITS),
            S_Pfact: +generateRandom(0, 1).toFixed(DIGITS),
            T_Pavg: +generateRandom(0, 1).toFixed(DIGITS),
            T_Irms: +generateRandom(0, 1).toFixed(DIGITS),
            T_Vrms: +generateRandom(0, 1).toFixed(DIGITS),
            T_Pfact: +generateRandom(0, 1).toFixed(DIGITS)
        };
    }

    return {
        state: {
            reported: {
                EUI: '31ENERGY-00000001',
                timestamp: Math.round(new Date().getTime() / 1000),
                data: {
                    delta: 60,
                    unit: 9,
                    average: {
                        temp: +generateRandom(-5, 5).toFixed(DIGITS),
                        Vref: +generateRandom(0, 5).toFixed(DIGITS),
                        R_Pavg: +generateRandom(0, 1).toFixed(DIGITS),
                        R_Irms: +generateRandom(0, 1).toFixed(DIGITS),
                        R_Vrms: +generateRandom(0, 1).toFixed(DIGITS),
                        R_Pfact: +generateRandom(0, 1).toFixed(DIGITS),
                        S_Pavg: +generateRandom(0, 1).toFixed(DIGITS),
                        S_Irms: +generateRandom(0, 1).toFixed(DIGITS),
                        S_Vrms: +generateRandom(0, 1).toFixed(DIGITS),
                        S_Pfact: +generateRandom(0, 1).toFixed(DIGITS),
                        T_Pavg: +generateRandom(0, 1).toFixed(DIGITS),
                        T_Irms: +generateRandom(0, 1).toFixed(DIGITS),
                        T_Vrms: +generateRandom(0, 1).toFixed(DIGITS),
                        T_Pfact: +generateRandom(0, 1).toFixed(DIGITS)
                    },
                    samples,
                    debug: {
                        coreBootCount: +generateRandom(0, 5).toFixed(DIGITS),
                        sensorBootCount: +generateRandom(0, 5).toFixed(DIGITS),
                        i2cFails: +generateRandom(0, 5).toFixed(DIGITS),
                        i2cOfflinePeriod: +generateRandom(0, 5).toFixed(DIGITS),
                        mqttPubFails: +generateRandom(0, 5).toFixed(DIGITS),
                        heapFreeSize: +generateRandom(0, 100000).toFixed(
                            DIGITS
                        ),
                        registerDataFails: +generateRandom(0, 5).toFixed(
                            DIGITS
                        ),
                        queueSize: +generateRandom(0, 5).toFixed(DIGITS)
                    }
                }
            }
        }
    };
};

export const map3PhaseMeter = ({ data, timestamp }) => {
    return {
        timestamp: new Date(timestamp * 1000),
        values: [
            {
                key: 'RP',
                title: 'Phase R - avg power',
                value: data.average['R_Pavg'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'RI',
                title: 'Phase R - rms intensity',
                value: data.average['R_Irms'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'RV',
                title: 'Phase R - rms voltage',
                value: data.average['R_Vrms'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'SP',
                title: 'Phase S - avg power',
                value: data.average['S_Pavg'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'SI',
                title: 'Phase S - rms intensity',
                value: data.average['S_Irms'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'SV',
                title: 'Phase S - rms voltage',
                value: data.average['S_Vrms'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'TP',
                title: 'Phase T - avg power',
                value: data.average['T_Pavg'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'TI',
                title: 'Phase T - rms intensity',
                value: data.average['T_Irms'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'TV',
                title: 'Phase T - rms voltage',
                value: data.average['T_Vrms'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'TEMP',
                title: 'Temperature - average on all 3 phases',
                value: data.average['temp'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'VREF',
                title: 'V Ref - on all 3 phases',
                value: data.average['Vref'],
                samples: data.samples,
                status: STATUS.Default
            }
        ]
    };
};

export const get3MeterUnit = (key, value) => {
    if (key === 'RP' || key === 'SP' || key === 'TP') {
        return `${value} W`;
    } else if (key === 'RI' || key === 'SI' || key === 'TI') {
        return `${value} A`;
    } else if (key === 'TEMP') {
        return `${value} °C`;
    } else {
        return `${value} V`;
    }
};

export const updateSamplesChart = (nextProps, currentState) => {
    const { samples, key } = nextProps.item;
    const { chartData } = currentState;

    if (chartData.length === 0) {
        const data = [];
        for (let index = 0; index < NUMBER_OF_METER_BARS; index++) {
            if (index === 0) {
                data[index] = {
                    x: moment(),
                    y: undefined
                };
            } else {
                data[index] = {
                    x: moment(data[index - 1].x).add(1, 's'),
                    y: undefined
                };
            }
        }

        return data;
    } else {
        const data = [];
        const slice = chartData.slice(60);

        for (let index = 0; index < samples.length; index++) {
            if (index === 0) {
                data[index] = {
                    x: moment(slice[slice.length - 1].x),
                    y: selectCorrectSample(samples[index], key)
                };
            } else {
                data[index] = {
                    x: moment(data[index - 1].x).add(1, 's'),
                    y: selectCorrectSample(samples[index], key)
                };
            }
        }

        return slice.concat(data);
    }
};

export const updateValueChart = (nextProps, currentState) => {
    const { value } = nextProps.item;
    const { chartData } = currentState;

    if (chartData.length === 0) {
        const data = [];
        for (let index = 0; index < NUMBER_OF_BARS; index++) {
            if (index === 0) {
                data[index] = {
                    x: moment(),
                    y: undefined
                };
            } else {
                data[index] = {
                    x: moment(data[index - 1].x).add(1, 's'),
                    y: undefined
                };
            }
        }

        return data;
    } else {
        return chartData.slice(1).concat({
            x: moment(chartData[chartData.length - 1].x).add(1, 's'),
            y: value
        });
    }
};

const selectCorrectSample = (sample, key) => {
    let value = null;

    switch (key) {
        case 'RP':
            value = sample['R_Pavg'];
            break;
        case 'RI':
            value = sample['R_Irms'];
            break;
        case 'RV':
            value = sample['R_Vrms'];
            break;
        case 'SP':
            value = sample['S_Pavg'];
            break;
        case 'SI':
            value = sample['S_Irms'];
            break;
        case 'SV':
            value = sample['S_Vrms'];
            break;
        case 'TP':
            value = sample['T_Pavg'];
            break;
        case 'TI':
            value = sample['T_Irms'];
            break;
        case 'TV':
            value = sample['T_Vrms'];
            break;
        case 'TEMP':
            value = sample['temp'];
            break;
        case 'VREF':
            value = sample['Vref'];
            break;
        default:
            break;
    }

    return value;
};

export const generateInitialMeterState = () => {
    return {
        meter: {
            timestamp: new Date(Date.now()),
            values: [
                {
                    key: 'RP',
                    title: 'Phase R - avg power',
                    value: '-',
                    samples: [],
                    status: STATUS.Default
                },
                {
                    key: 'RI',
                    title: 'Phase R - rms intensity',
                    value: '-',
                    samples: [],
                    status: STATUS.Default
                },
                {
                    key: 'RV',
                    title: 'Phase R - rms voltage',
                    value: '-',
                    samples: [],
                    status: STATUS.Default
                },
                {
                    key: 'SP',
                    title: 'Phase S - avg power',
                    value: '-',
                    samples: [],
                    status: STATUS.Default
                },
                {
                    key: 'SI',
                    title: 'Phase S - rms intensity',
                    value: '-',
                    samples: [],
                    status: STATUS.Default
                },
                {
                    key: 'SV',
                    title: 'Phase S - rms voltage',
                    value: '-',
                    samples: [],
                    status: STATUS.Default
                },
                {
                    key: 'TP',
                    title: 'Phase T - avg power',
                    value: '-',
                    samples: [],
                    status: STATUS.Default
                },
                {
                    key: 'TI',
                    title: 'Phase T - rms intensity',
                    value: '-',
                    samples: [],
                    status: STATUS.Default
                },
                {
                    key: 'TV',
                    title: 'Phase T - rms voltage',
                    value: '-',
                    samples: [],
                    status: STATUS.Default
                },
                {
                    key: 'TEMP',
                    title: 'Temperature - average on all 3 phases',
                    value: '-',
                    samples: [],
                    status: STATUS.Default
                },
                {
                    key: 'VREF',
                    title: 'V Ref - on all 3 phases',
                    value: '-',
                    samples: [],
                    status: STATUS.Default
                }
            ]
        },
        debugging: {
            timestamp: new Date(Date.now()),
            values: [
                {
                    key: 'CBC',
                    title: 'Core boot count',
                    value: '-',
                    status: STATUS.Default
                },
                {
                    key: 'SBC',
                    title: 'Sensor boot count',
                    value: '-',
                    status: STATUS.Default
                },
                {
                    key: 'I2CF',
                    title: 'I2C fails',
                    value: '-',
                    status: STATUS.Default
                },
                {
                    key: 'I2COP',
                    title: 'I2C offline period',
                    value: '-',
                    status: STATUS.Default
                },
                {
                    key: 'MQTTPF',
                    title: 'MQTT pub fails',
                    value: '-',
                    status: STATUS.Default
                },
                {
                    key: 'HFS',
                    title: 'Heap free size',
                    value: '-',
                    status: STATUS.Default
                },
                {
                    key: 'RDF',
                    title: 'Register data fails',
                    value: '-',
                    status: STATUS.Default
                },
                {
                    key: 'QS',
                    title: 'Queue size',
                    value: '-',
                    status: STATUS.Default
                }
            ]
        }
    };
};

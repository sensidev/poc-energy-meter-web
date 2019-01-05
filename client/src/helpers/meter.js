import moment from 'moment';

import {DIGITS, generateRandom, STATUS} from './';

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

export const map3PhaseMeter = ({data, timestamp}) => {
    return {
        timestamp: new Date(timestamp * 1000),
        values: [
            {
                key: 'RP',
                title: 'Phase R - Power Avg',
                value: data.average['R_Pavg'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'RI',
                title: 'Phase R - I rms',
                value: data.average['R_Irms'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'RImin',
                title: 'Phase R - I min',
                value: data.average['R_Imin'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'RImax',
                title: 'Phase R - I max',
                value: data.average['R_Imax'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'RV',
                title: 'Phase R - V rms',
                value: data.average['R_Vrms'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'RVmin',
                title: 'Phase R - V min',
                value: data.average['R_Vmin'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'RVmax',
                title: 'Phase R - V max',
                value: data.average['R_Vmax'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'SP',
                title: 'Phase S - Power avg',
                value: data.average['S_Pavg'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'SI',
                title: 'Phase S - I rms',
                value: data.average['S_Irms'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'SImin',
                title: 'Phase S - I min',
                value: data.average['S_Imin'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'SImax',
                title: 'Phase S - I max',
                value: data.average['S_Imax'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'SV',
                title: 'Phase S - V rms',
                value: data.average['S_Vrms'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'SVmin',
                title: 'Phase S - V min',
                value: data.average['S_Vmin'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'SVmax',
                title: 'Phase S - V max',
                value: data.average['S_Vmax'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'TP',
                title: 'Phase T - Power avg',
                value: data.average['T_Pavg'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'TI',
                title: 'Phase T - I rms',
                value: data.average['T_Irms'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'TImin',
                title: 'Phase T - I min',
                value: data.average['T_Imin'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'TImax',
                title: 'Phase T - I max',
                value: data.average['T_Imax'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'TV',
                title: 'Phase T - V rms',
                value: data.average['T_Vrms'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'TVmin',
                title: 'Phase T - V min',
                value: data.average['T_Vmin'],
                samples: data.samples,
                status: STATUS.Default
            },
            {
                key: 'TVmax',
                title: 'Phase T - V max',
                value: data.average['T_Vmax'],
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
    } else if (
        key === 'RI' || key === 'RImin' || key === 'RImax' ||
        key === 'SI' || key === 'SImin' || key === 'SImax' ||
        key === 'TI' || key === 'TImin' || key === 'TImax') {
        return `${value} A`;
    } else if (key === 'TEMP') {
        return `${value} °C`;
    } else {
        return `${value} V`;
    }
};

export const updateSamplesChart = (nextProps, currentState) => {
    const {samples, key} = nextProps.item;
    const {chartData} = currentState;

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
    const {value} = nextProps.item;
    const {chartData} = currentState;

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
        case 'RImin':
            value = sample['R_Imin'];
            break;
        case 'RImax':
            value = sample['R_Imax'];
            break;
        case 'RV':
            value = sample['R_Vrms'];
            break;
        case 'RVmin':
            value = sample['R_Vmin'];
            break;
        case 'RVmax':
            value = sample['R_Vmax'];
            break;
        case 'SP':
            value = sample['S_Pavg'];
            break;
        case 'SI':
            value = sample['S_Irms'];
            break;
        case 'SImin':
            value = sample['S_Imin'];
            break;
        case 'SImax':
            value = sample['S_Imax'];
            break;
        case 'SV':
            value = sample['S_Vrms'];
            break;
        case 'SVmin':
            value = sample['S_Vmin'];
            break;
        case 'SVmax':
            value = sample['S_Vmax'];
            break;
        case 'TP':
            value = sample['T_Pavg'];
            break;
        case 'TI':
            value = sample['T_Irms'];
            break;
        case 'TImin':
            value = sample['T_Imin'];
            break;
        case 'TImax':
            value = sample['T_Imax'];
            break;
        case 'TV':
            value = sample['T_Vrms'];
            break;
        case 'TVmin':
            value = sample['T_Vmin'];
            break;
        case 'TVmax':
            value = sample['T_Vmax'];
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
            values: [{
                key: 'RP',
                title: 'Phase R - Power Avg',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'RI',
                title: 'Phase R - I rms',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'RImin',
                title: 'Phase R - I min',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'RImax',
                title: 'Phase R - I max',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'RV',
                title: 'Phase R - V rms',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'RVmin',
                title: 'Phase R - V min',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'RVmax',
                title: 'Phase R - V max',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'SP',
                title: 'Phase S - Power avg',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'SI',
                title: 'Phase S - I rms',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'SImin',
                title: 'Phase S - I min',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'SImax',
                title: 'Phase S - I max',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'SV',
                title: 'Phase S - V rms',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'SVmin',
                title: 'Phase S - V min',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'SVmax',
                title: 'Phase S - V max',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'TP',
                title: 'Phase T - Power avg',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'TI',
                title: 'Phase T - I rms',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'TImin',
                title: 'Phase T - I min',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'TImax',
                title: 'Phase T - I max',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'TV',
                title: 'Phase T - V rms',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'TVmin',
                title: 'Phase T - V min',
                value: '-',
                samples: [],
                status: STATUS.Default
            },
            {
                key: 'TVmax',
                title: 'Phase T - V max',
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

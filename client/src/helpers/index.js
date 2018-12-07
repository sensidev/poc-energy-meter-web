import moment from 'moment';

const NUMBER_OF_BARS = 34;
const NUMBER_OF_METER_BARS = 300;
export const DIGITS = 2;

export const STATUS = {
    Default: 'default',
    Ok: 'ok',
    Warning: 'warning',
    Critical: 'critical'
};

const generateRandom = (min, max) => {
    return Math.random() * (max - min) + min;
};

export const generateBear = () => {
    return {
        timestamp: new Date(Date.now()),
        state: {
            reported: {
                EUI: '12341234DEADBEEF',
                type: 'Bear',
                data: {
                    temperature: +generateRandom(20, 30).toFixed(DIGITS),
                    humidity: +generateRandom(50, 60).toFixed(DIGITS),
                    VOC: +generateRandom(5, 10).toFixed(DIGITS),
                    CO2: +generateRandom(400, 500).toFixed(DIGITS),
                    HCHO: +generateRandom(0, 1).toFixed(DIGITS),
                    PM25: +generateRandom(40, 50).toFixed(DIGITS)
                },
                cmd: 'rx',
                other: 'values'
            }
        }
    };
};

export const generateEnergy = () => {
    return {
        timestamp: new Date(Date.now()),
        state: {
            reported: {
                EUI: '12341234DEADBEEF',
                type: 'Energy',
                data: {
                    current: +generateRandom(1, 10).toFixed(DIGITS),
                    power: +generateRandom(200, 1000).toFixed(DIGITS),
                    energy: +generateRandom(500, 800).toFixed(DIGITS)
                },
                cmd: 'rx',
                other: 'values'
            }
        }
    };
};

export const getDataFromJSON = data => {
    if (data.state.reported.type === 'Bear') {
        return {
            timestamp: data.timestamp,
            values: [
                {
                    key: 'temp',
                    title: 'Temperature',
                    value: data.state.reported.data.temperature,
                    status: STATUS.Default
                },
                {
                    key: 'hum',
                    title: 'Humidity',
                    value: data.state.reported.data.humidity,
                    status: STATUS.Default
                },
                {
                    key: 'voc',
                    title: 'tVOC',
                    value: data.state.reported.data.VOC,
                    status: STATUS.Warning
                },
                {
                    key: 'co',
                    title: 'CO2',
                    value: data.state.reported.data.CO2,
                    status: STATUS.Default
                },
                {
                    key: 'hcho',
                    title: 'Formaldehyde',
                    value: data.state.reported.data.HCHO,
                    status: STATUS.Warning
                },
                {
                    key: 'pm',
                    title: 'PM2.5',
                    value: data.state.reported.data.PM25,
                    status: STATUS.Critical
                }
            ]
        };
    }

    return {
        timestamp: data.timestamp,
        values: [
            {
                key: 'cur',
                title: 'Current',
                value: data.state.reported.data.current,
                status: STATUS.Default
            },
            {
                key: 'pow',
                title: 'Power',
                value: data.state.reported.data.power,
                status: STATUS.Default
            },
            {
                key: 'en',
                title: 'Energy',
                value: data.state.reported.data.energy,
                status: STATUS.Ok
            }
        ]
    };
};

export const getMeasurementUnit = (key, value) => {
    switch (key) {
        case 'temp': {
            return `${value} °C`;
        }
        case 'hum': {
            return `${value} %`;
        }
        case 'voc': {
            return `${value} ppm`;
        }
        case 'co': {
            return `${value} ppm`;
        }
        case 'hcho': {
            return `${value} ppm`;
        }
        case 'pm': {
            return `${value} ug/\u33a5`;
        }
        case 'cur': {
            return `${value} A`;
        }
        case 'pow': {
            return `${value} W`;
        }
        case 'en': {
            return `${value} Wh`;
        }
        default:
            break;
    }
};

export const updateChartData = (nextProps, currentState) => {
    const { value } = nextProps.item;
    const { count, chartData } = currentState;

    if (count > 0) {
        if (chartData.length === 0) {
            return [
                {
                    x: moment(),
                    y: value
                }
            ];
        } else if (chartData.length <= NUMBER_OF_BARS) {
            return [
                ...chartData,
                {
                    x: moment(chartData[chartData.length - 1].x).add(5, 's'),
                    y: value
                }
            ];
        } else {
            return chartData.slice(1).concat({
                x: moment(chartData[chartData.length - 1].x).add(5, 's'),
                y: value
            });
        }
    }

    return [];
};

export const generate3PhaseMeter = () => {
    const samples = new Array(60);
    for (let index = 0; index < 60; index++) {
        samples[index] = {
            R: {
                Pavg: +generateRandom(15000, 1600).toFixed(DIGITS),
                Irms: +generateRandom(4, 5).toFixed(DIGITS),
                Vrms: +generateRandom(200, 300).toFixed(DIGITS)
            },
            S: {
                Pavg: +generateRandom(15000, 1600).toFixed(DIGITS),
                Irms: +generateRandom(4, 5).toFixed(DIGITS),
                Vrms: +generateRandom(200, 300).toFixed(DIGITS)
            },
            T: {
                Pavg: +generateRandom(15000, 1600).toFixed(DIGITS),
                Irms: +generateRandom(4, 5).toFixed(DIGITS),
                Vrms: +generateRandom(200, 300).toFixed(DIGITS)
            },
            temp: +generateRandom(-5, 25).toFixed(DIGITS),
            Vref: +generateRandom(0, 2).toFixed(DIGITS)
        };
    }

    return {
        state: {
            reported: {
                EUI: '31ENERGY-00000001',
                sensingUnitTag: 123,
                delta: 60,
                data: {
                    average: {
                        R: {
                            Pavg: +generateRandom(15000, 1600).toFixed(DIGITS),
                            Irms: +generateRandom(4, 5).toFixed(DIGITS),
                            Vrms: +generateRandom(200, 300).toFixed(DIGITS)
                        },
                        S: {
                            Pavg: +generateRandom(15000, 1600).toFixed(DIGITS),
                            Irms: +generateRandom(4, 5).toFixed(DIGITS),
                            Vrms: +generateRandom(200, 300).toFixed(DIGITS)
                        },
                        T: {
                            Pavg: +generateRandom(15000, 1600).toFixed(DIGITS),
                            Irms: +generateRandom(4, 5).toFixed(DIGITS),
                            Vrms: +generateRandom(200, 300).toFixed(DIGITS)
                        },
                        temp: 21.65,
                        Vref: 1.144
                    },
                    samples
                },
                config: {
                    samplesToSendPerUnit: 60
                }
            }
        },
        timestamp: new Date(Date.now())
    };
};

export const map3PhaseMeter = data => {
    return {
        timestamp: data.timestamp,
        values: [
            {
                key: 'RP',
                title: 'Phase R - avg power',
                value: data.state.reported.data.average['R'].Pavg,
                samples: data.state.reported.data.samples,
                status: STATUS.Default
            },
            {
                key: 'RI',
                title: 'Phase R - rms intensity',
                value: data.state.reported.data.average['R'].Irms,
                samples: data.state.reported.data.samples,
                status: STATUS.Default
            },
            {
                key: 'RV',
                title: 'Phase R - rms voltage',
                value: data.state.reported.data.average['R'].Vrms,
                samples: data.state.reported.data.samples,
                status: STATUS.Default
            },
            {
                key: 'SP',
                title: 'Phase S - avg power',
                value: data.state.reported.data.average['S'].Pavg,
                samples: data.state.reported.data.samples,
                status: STATUS.Default
            },
            {
                key: 'SI',
                title: 'Phase S - rms intensity',
                value: data.state.reported.data.average['S'].Irms,
                samples: data.state.reported.data.samples,
                status: STATUS.Default
            },
            {
                key: 'SV',
                title: 'Phase S - rms voltage',
                value: data.state.reported.data.average['S'].Vrms,
                samples: data.state.reported.data.samples,
                status: STATUS.Default
            },
            {
                key: 'TP',
                title: 'Phase T - avg power',
                value: data.state.reported.data.average['T'].Pavg,
                samples: data.state.reported.data.samples,
                status: STATUS.Default
            },
            {
                key: 'TI',
                title: 'Phase T - rms intensity',
                value: data.state.reported.data.average['T'].Irms,
                samples: data.state.reported.data.samples,
                status: STATUS.Default
            },
            {
                key: 'TV',
                title: 'Phase T - rms voltage',
                value: data.state.reported.data.average['T'].Vrms,
                samples: data.state.reported.data.samples,
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
    } else {
        return `${value} V`;
    }
};

// export const update3MeterChart = (item, chartData, index) => {
//     const { samples, key } = item;

//     if (chartData.length === 0) {
//         const data = [];
//         for (let index = 0; index < NUMBER_OF_METER_BARS; index++) {
//             if (index === 0) {
//                 data[index] = {
//                     x: moment(),
//                     y: 0
//                 };
//             } else {
//                 data[index] = {
//                     x: moment(data[index - 1].x).add(1, 's'),
//                     y: 0
//                 };
//             }
//         }

//         return data;
//     } else {
//         return chartData.slice(1).concat({
//             x: moment(chartData[chartData.length - 1].x).add(1, 's'),
//             y: selectCorrectSample(samples[index], key)
//         });
//     }
// };

export const update3MeterChart = (nextProps, currentState) => {
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

const selectCorrectSample = (sample, key) => {
    let value = null;

    switch (key) {
        case 'RP':
            value = sample['R'].Pavg;
            break;
        case 'RI':
            value = sample['R'].Irms;
            break;
        case 'RV':
            value = sample['R'].Vrms;
            break;
        case 'SP':
            value = sample['S'].Pavg;
            break;
        case 'SI':
            value = sample['S'].Irms;
            break;
        case 'SV':
            value = sample['S'].Vrms;
            break;
        case 'TP':
            value = sample['T'].Pavg;
            break;
        case 'TI':
            value = sample['T'].Irms;
            break;
        case 'TV':
            value = sample['T'].Vrms;
            break;
        default:
            break;
    }

    return value;
};

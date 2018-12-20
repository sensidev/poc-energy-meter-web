import moment from 'moment';

const NUMBER_OF_BARS = 34;
export const DIGITS = 5;

export const STATUS = {
    Default: 'default',
    Ok: 'ok',
    Warning: 'warning',
    Critical: 'critical'
};

export const generateRandom = (min, max) => {
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

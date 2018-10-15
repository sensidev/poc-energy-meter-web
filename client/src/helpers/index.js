const NUMBER_OF_BARS = 34;
export const SAMPLING_TIME = 5000;
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

const generateBear = () => {
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
                    'PM2.5': +generateRandom(40, 50).toFixed(DIGITS)
                },
                cmd: 'rx',
                other: 'values'
            }
        }
    };
};

const generateEnergy = () => {
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

export const getDataFromJSON = () => {
    const bear = generateBear();
    const energy = generateEnergy();

    return {
        timestamp:
            bear.timestamp >= energy.timestamp
                ? bear.timestamp
                : energy.timestamp,
        values: [
            {
                key: 'temp',
                title: 'Temperature',
                value: bear.state.reported.data.temperature,
                status: STATUS.Default
            },
            {
                key: 'hum',
                title: 'Humidity',
                value: bear.state.reported.data.humidity,
                status: STATUS.Default
            },
            {
                key: 'voc',
                title: 'VOC',
                value: bear.state.reported.data.VOC,
                status: STATUS.Warning
            },
            {
                key: 'co',
                title: 'CO2',
                value: bear.state.reported.data.CO2,
                status: STATUS.Critical
            },
            {
                key: 'hcho',
                title: 'HCHO',
                value: bear.state.reported.data.HCHO,
                status: STATUS.Ok
            },
            {
                key: 'pm',
                title: 'PM2.5',
                value: bear.state.reported.data['PM2.5'],
                status: STATUS.Default
            },
            {
                key: 'cur',
                title: 'Current',
                value: energy.state.reported.data.current,
                status: STATUS.Default
            },
            {
                key: 'pow',
                title: 'Power',
                value: energy.state.reported.data.power,
                status: STATUS.Default
            },
            {
                key: 'en',
                title: 'Energy',
                value: energy.state.reported.data.energy,
                status: STATUS.Default
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
            return `${value} ug/m3`;
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

export const updateChartData = (data, value) => {
    if (data.length === 0) {
        return [
            {
                x: new Date(Date.now()),
                y: value
            }
        ];
    } else if (data.length <= NUMBER_OF_BARS) {
        return [
            ...data,
            {
                x: new Date(Date.now()),
                y: value
            }
        ];
    } else {
        return data.slice(1).concat({
            x: new Date(Date.now()),
            y: value
        });
    }
};

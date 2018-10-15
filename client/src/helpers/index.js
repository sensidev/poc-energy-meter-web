const NUMBER_OF_BARS = 34;
const DIGITS = 2;

export const STATUS = {
    Default: 'default',
    Ok: 'ok',
    Warning: 'warning',
    Critical: 'critical'
};

export const generateRandom = (min, max) => {
    return Math.random() * (max - min) + min;
};

export const generateData = () => {
    return {
        timestamp: new Date(Date.now()),
        values: [
            {
                key: 'temp',
                title: 'Temperature',
                value: +generateRandom(20, 30).toFixed(DIGITS),

                status: STATUS.Default
            },
            {
                key: 'hum',
                title: 'Humidity',
                value: +generateRandom(50, 60).toFixed(DIGITS),
                status: STATUS.Default
            },

            {
                key: 'voc',
                title: 'VOC',
                value: +generateRandom(5, 10).toFixed(DIGITS),
                status: STATUS.Warning
            },
            {
                key: 'co',
                title: 'CO2',
                value: +generateRandom(400, 500).toFixed(DIGITS),
                status: STATUS.Critical
            },
            {
                key: 'hcho',
                title: 'HCHO',
                value: +generateRandom(0, 1).toFixed(DIGITS),
                status: STATUS.Ok
            },
            {
                key: 'pm',
                title: 'PM2.5',
                value: +generateRandom(40, 50).toFixed(DIGITS),
                status: STATUS.Default
            },
            {
                key: 'cur',
                title: 'Current',
                value: +generateRandom(1, 10).toFixed(DIGITS),
                status: STATUS.Default
            },
            {
                key: 'pow',
                title: 'Power',
                value: +generateRandom(200, 1000).toFixed(DIGITS),
                status: STATUS.Default
            },
            {
                key: 'en',
                title: 'Energy',
                value: +generateRandom(500, 800).toFixed(DIGITS),
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

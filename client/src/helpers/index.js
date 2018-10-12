const DIGITS = 2;

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
                value: +generateRandom(20, 30).toFixed(DIGITS)
            },
            {
                key: 'hum',
                title: 'Humidity',
                value: +generateRandom(50, 60).toFixed(DIGITS)
            },

            {
                key: 'voc',
                title: 'VOC',
                value: +generateRandom(5, 10).toFixed(DIGITS)
            },
            {
                key: 'co',
                title: 'CO2',
                value: +generateRandom(400, 500).toFixed(DIGITS)
            },
            {
                key: 'hcho',
                title: 'HCHO',
                value: +generateRandom(0, 1).toFixed(DIGITS)
            },
            {
                key: 'pm',
                title: 'PM2.5',
                value: +generateRandom(40, 50).toFixed(DIGITS)
            },
            {
                key: 'cur',
                title: 'Current',
                value: +generateRandom(1, 10).toFixed(DIGITS)
            },
            {
                key: 'pow',
                title: 'Power',
                value: +generateRandom(200, 1000).toFixed(DIGITS)
            },
            {
                key: 'en',
                title: 'Energy',
                value: +generateRandom(500, 800).toFixed(DIGITS)
            },
            {
                key: 'vol',
                title: 'Voltage',
                value: +generateRandom(200, 300).toFixed(DIGITS)
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
        case 'vol': {
            return `${value} V`;
        }
        default:
            break;
    }
};

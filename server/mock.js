const DIGITS = 3;

const generateData = (dataPoints) => {
    let points = new Array(dataPoints);
    let min = 16;
    let max = 0;
    let sum = 0;

    for (let index = 0; index < dataPoints; index++) {
        const point = +(Math.random() * (16 - 0) + 0).toFixed(DIGITS);
        sum += point;

        if (point < min) {
            min = point;
        }
        if (point > max) {
            max = point;
        }

        const date = new Date();
        const timestamp = date.getTime();

        const step = 1000;
        const x = timestamp + index * step;
        const y = +point.toFixed(DIGITS);

        points[index] = {x, y: +y};
    }

    const avg = sum / 60;
    const voltage = Math.floor(Math.random() * (245 - 210) + 210);
    const power = Math.floor(Math.random() * (22000 - 0) + 0);
    const energy = Math.random() * (1.5 - 0) + 0;

    return {
        voltage: +voltage.toFixed(DIGITS),
        power: +power.toFixed(DIGITS),
        energy: +energy.toFixed(DIGITS),
        avg: +avg.toFixed(DIGITS),
        min: +min.toFixed(DIGITS),
        max: +max.toFixed(DIGITS),
        points: points
    };
};

const generateChannels = (num, dataPoints) => {
    let channels = new Array(num);

    for (let index = 0; index < num; index++) {
        const data = generateData(dataPoints);

        channels[index] = {
            id: index,
            energy: +data.energy,
            voltage: data.voltage,
            power: data.power,
            rms_min_current: +data.min,
            rms_avg_current: +data.avg,
            rms_max_current: +data.max,
            rms_current_data_points: data.points
        };
    }

    return channels;
};

module.exports = generateChannels;

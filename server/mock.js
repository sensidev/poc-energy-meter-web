let totalEnergy = 0;

const generateData = (dataPoints, initial) => {
    let points = new Array(dataPoints);
    let min = 16;
    let max = 0;
    let sum = 0;

    for (let index = 0; index < dataPoints; index++) {
        const point = Math.random() * (16 - 0) + 0;
        sum += point;

        if (point < min) {
            min = point;
        }
        if (point > max) {
            max = point;
        }

        const sPoint = String(point);

        const date = new Date();
        let timestamp;
        if (initial) {
            timestamp = date.getTime() - 55000;
        } else {
            timestamp = date.getTime();
        }

        const step = 1000;
        const x = timestamp + index * step;
        const y = sPoint.substring(0, sPoint.indexOf('.') + 4);

        points[index] = { x, y: +y };
    }

    const avg = sum / 60;
    const voltage = Math.floor(Math.random() * (245 - 210) + 210);
    const power = Math.floor(Math.random() * (22000 - 0) + 0);
    const energy = Math.random() * (1.5 - 0) + 0;
    totalEnergy += energy;

    const sEnergy = String(totalEnergy);
    const sAvg = String(avg);
    const sMin = String(min);
    const sMax = String(max);

    return {
        voltage,
        power,
        energy: sEnergy.substring(0, sEnergy.indexOf('.') + 4),
        avg: sAvg.substring(0, sAvg.indexOf('.') + 4),
        min: sMin.substring(0, sMin.indexOf('.') + 4),
        max: sMax.substring(0, sMax.indexOf('.') + 4),
        points
    };
};

const generateChannels = (num, dataPoints, initial) => {
    let channels = new Array(num);

    for (let index = 0; index < num; index++) {
        const data = generateData(dataPoints, initial);

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

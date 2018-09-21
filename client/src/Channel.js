import * as React from 'react';
import { Line } from 'react-chartjs-2';

import './App.css';

const generateLabels = () => {
    let labels = new Array(60);
    for (let i = 0; i < 60; i++) {
        labels[i] = i;
    }

    return labels;
};

const options = {
    legend: {
        display: false
    },
    scales: {
        xAxes: [
            {
                display: false
            }
        ],
        yAxes: [
            {
                display: false
            }
        ]
    },
    tooltips: {
        callbacks: {
            label: function(tooltipItem) {
                return tooltipItem.yLabel;
            }
        }
    },
    responsive: true,
    maintainAspectRatio: false
};

export const Channel = ({ data }) => {
    const chartData = {
        labels: generateLabels(),
        datasets: [
            {
                fill: true,
                lineTension: 0.4,
                backgroundColor: '#1D348C',
                borderColor: '#1D348C',
                borderCapStyle: 'round',
                borderJoinStyle: 'round',
                pointBorderColor: '#1D348C',
                pointBackgroundColor: '#1D348C',
                pointBorderWidth: 0,
                pointHoverRadius: 0,
                pointHoverBackgroundColor: '#1D348C',
                pointHoverBorderColor: '#1D348C',
                pointHoverBorderWidth: 0,
                pointRadius: 0,
                pointHitRadius: 0,
                data: data.rms_current_data_points
            }
        ]
    };

    return (
        <div className="channel">
            <div className="chart">
                <Line data={chartData} options={options} />
            </div>

            <div className="panel">
                <div className="column">
                    <p className="panel-label">VOLTAGE</p>
                    <p className="panel-value">{data.voltage} V</p>
                </div>
                <div className="column">
                    <p className="panel-label">POWER</p>
                    <p className="panel-value">{data.power} W</p>
                </div>
                <div className="column">
                    <p className="panel-label">ENERGY</p>
                    <p className="panel-value">{data.energy} Wh</p>
                </div>
                <div className="column">
                    <p className="panel-label">MIN RMS CURRENT</p>
                    <p className="panel-value">{data.rms_min_current} A</p>
                </div>
                <div className="column">
                    <p className="panel-label">AVG RMS CURRENT</p>
                    <p className="panel-value">{data.rms_avg_current} A</p>
                </div>
                <div className="column">
                    <p className="panel-label">MAX RMS CURRENT</p>
                    <p className="panel-value">{data.rms_max_current} A</p>
                </div>
            </div>
        </div>
    );
};

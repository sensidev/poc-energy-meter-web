import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

import './Channel.css';

export const Channel = ({ chartData }) => {
    const options = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [
                {
                    type: 'time',
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        fontColor: '#fff',
                        source: 'auto'
                    }
                }
            ],
            yAxes: [
                {
                    ticks: { min: 0, max: 17 }, // fix preventing points from being cut off
                    display: false
                }
            ]
        },
        plugins: {
            datalabels: {
                backgroundColor: '#7188e2',
                borderRadius: 4,
                color: 'white',
                font: {
                    weight: 'bold'
                },
                formatter: value => {
                    return Math.round(value.y);
                }
            }
        },
        tooltips: {
            mode: 'nearest',
            intersect: false,
            callbacks: {}
        },
        hover: {
            mode: 'nearest',
            intersect: false
        },
        animation: false,
        responsive: true,
        maintainAspectRatio: false
    };

    const chartConfig = {
        datasets: [
            {
                fill: true,
                lineTension: 0.5,
                backgroundColor: '#1D348C',
                pointBorderColor: '#1D348C',
                pointBackgroundColor: '#637de2',
                data: chartData.rms_current_data_points
            }
        ]
    };

    return (
        <div className="channel">
            <div className="chart">
                <Line data={chartConfig} options={options} />
            </div>

            <div className="panel">
                <div className="column">
                    <p className="panel-label">VOLTAGE</p>
                    <p className="panel-value">{chartData.voltage} V</p>
                </div>
                <div className="column">
                    <p className="panel-label">POWER</p>
                    <p className="panel-value">{chartData.power} W</p>
                </div>
                <div className="column">
                    <p className="panel-label">ENERGY</p>
                    <p className="panel-value">{chartData.energy} Wh</p>
                </div>
                <div className="column">
                    <p className="panel-label">MIN RMS CURRENT</p>
                    <p className="panel-value">{chartData.rms_min_current} A</p>
                </div>
                <div className="column">
                    <p className="panel-label">AVG RMS CURRENT</p>
                    <p className="panel-value">{chartData.rms_avg_current} A</p>
                </div>
                <div className="column">
                    <p className="panel-label">MAX RMS CURRENT</p>
                    <p className="panel-value">{chartData.rms_max_current} A</p>
                </div>
            </div>
        </div>
    );
};

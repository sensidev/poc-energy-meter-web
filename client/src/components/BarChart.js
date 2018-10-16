import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

import { theme } from '../theme';

export const BarChart = ({ chartData, timestamp, color }) => {
    const options = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [
                {
                    type: 'time',
                    display: false,
                    offset: true,
                    barThickness: 3
                }
            ],
            yAxes: [
                {
                    display: false
                }
            ]
        },
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                display: () => {
                    return null;
                }
            }
        },
        tooltips: {
            mode: 'nearest',
            intersect: false,
            callbacks: {
                title: () => {
                    return (
                        moment(timestamp)
                            .fromNow()
                            .toLocaleLowerCase() + ' ago'
                    );
                }
            }
        },
        hover: {
            mode: 'nearest',
            intersect: false
        }
    };

    const chartConfig = {
        datasets: [
            {
                backgroundColor: theme[color] ? theme[color] : theme.default,
                data: chartData
            }
        ]
    };

    return <Bar data={chartConfig} options={options} height={100} />;
};

BarChart.propTypers = {
    chartData: PropTypes.array.isRequired,
    timestamp: PropTypes.instanceOf(Date),
    color: PropTypes.string
};

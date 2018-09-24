import * as React from 'react';
import socketIOClient from 'socket.io-client';

import {Channel} from './Channel';
import './App.css';

const API_ROOT = process.env.REACT_APP_API_ROOT || 'http://localhost:8000';
const NUMBER_OF_CHANNELS = 4;
const DATA_POINTS_PER_CHART = 60;
const DIGITS = 3;

const generateChannels = num => {
    const now = new Date();
    const step = 5000;

    let channels = new Array(num);

    for (let index = 0; index < num; index++) {
        channels[index] = {
            id: index,
            timestamp: 0,
            energy: 0,
            voltage: 0,
            power: 0,
            rms_min_current: 0,
            rms_avg_current: 0,
            rms_max_current: 0,
            rms_current_data_points: []
        };

        // Fill with zeros.
        for (let p = 0; p < DATA_POINTS_PER_CHART; p++) {
            channels[index]['rms_current_data_points'][p] = {
                x: new Date(now - step * p),
                y: 0.0
            };
        }
    }

    return channels;
};

class App extends React.Component {
    state = {
        data: generateChannels(NUMBER_OF_CHANNELS),
    };

    socket = socketIOClient(API_ROOT, {path: '/ws'});

    componentDidMount() {
        console.log("Connected to ", API_ROOT);
        this.socket.on('channels', data => {
            const newData = this.state.data.map((channel, index) => {
                const newPoints = data[index].rms_current_data_points;

                this.addNewPointsFor(channel, newPoints);
                this.removeOldPointsFor(channel);

                this.computeMinAvgMaxRMSCurrentFor(channel);

                channel.energy += +data[index].energy;  // sum up energy!

                channel.energy = +channel.energy.toFixed(DIGITS);
                channel.power = +data[index].power.toFixed(DIGITS);
                channel.voltage = +data[index].voltage.toFixed(DIGITS);


                return channel;
            });

            this.setState({data: newData});
        });
    }

    addNewPointsFor(channel, newPoints) {
        channel.rms_current_data_points = channel.rms_current_data_points.concat(
            newPoints
        );
    }

    removeOldPointsFor(channel) {
        if (channel.rms_current_data_points.length > DATA_POINTS_PER_CHART) {
            channel.rms_current_data_points.splice(
                0, (channel.rms_current_data_points.length - DATA_POINTS_PER_CHART)
            );
        }
    }

    computeMinAvgMaxRMSCurrentFor(channel) {
        let sum = 0;
        let max = 0;
        let min = Number.MAX_SAFE_INTEGER;

        for (const point of channel.rms_current_data_points) {
            sum += point.y;

            if (point.y < min) {
                min = point.y;
            }
            if (point.y > max) {
                max = point.y;
            }
        }

        channel.rms_avg_current = (sum / DATA_POINTS_PER_CHART).toFixed(DIGITS);
        channel.rms_min_current = min.toFixed(DIGITS);
        channel.rms_max_current = max.toFixed(DIGITS);
    }

    render() {
        return (
            <div className="container">
                {this.state.data.map(channel => (
                    <Channel key={channel.id} chartData={channel}/>
                ))}
            </div>
        );
    }
}

export default App;

import * as React from 'react';
import socketIOClient from 'socket.io-client';

import { Channel } from './Channel';
import './App.css';

const ENDPOINT = 'http://127.0.0.1:8000';
/*
* Number of channels generated
*/
const NUMBER_OF_CHANNELS = 4;

const generateChannels = num => {
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
    }

    return channels;
};

class App extends React.Component {
    state = {
        data: generateChannels(NUMBER_OF_CHANNELS),
        first: true
    };

    socket = socketIOClient(ENDPOINT);

    componentDidMount() {
        this.socket.on('channels', data => {
            if (this.state.first) {
                this.setState({ data, first: false });
            } else {
                const newData = this.state.data.map((channel, index) => {
                    const incomingDataPoints =
                        data[index].rms_current_data_points;

                    channel.rms_current_data_points = channel.rms_current_data_points.concat(
                        incomingDataPoints
                    );

                    channel.rms_current_data_points.splice(
                        0,
                        incomingDataPoints.length
                    );

                    let sum = 0;
                    let max = 0;
                    let min = 16;
                    for (const point of channel.rms_current_data_points) {
                        point.x = new Date(point.x);
                        sum += point.y;

                        if (point.y < min) {
                            min = point.y;
                        }
                        if (point.y > max) {
                            max = point.y;
                        }
                    }
                    const avg = sum / 60;
                    const sAvg = String(avg);

                    channel.energy = data[index].energy;
                    channel.power = data[index].power;
                    channel.voltage = data[index].voltage;
                    channel.rms_avg_current = sAvg.substring(
                        0,
                        sAvg.indexOf('.') + 4
                    );
                    channel.rms_min_current = min;
                    channel.rms_max_current = max;

                    return channel;
                });
                this.setState({ data: newData });
            }
        });
    }

    render() {
        return (
            <div className="container">
                {this.state.data.map(channel => (
                    <Channel chartData={channel} />
                ))}
            </div>
        );
    }
}

export default App;

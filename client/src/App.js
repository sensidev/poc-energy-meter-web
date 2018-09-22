import * as React from 'react';
import socketIOClient from 'socket.io-client';

import { Channel } from './Channel';
import './App.css';

const ENDPOINT = 'http://127.0.0.1:8000';

const channels = [
    {
        id: 0,
        timestamp: 0,
        energy: 0,
        voltage: 0,
        power: 0,
        rms_min_current: 0,
        rms_avg_current: 0,
        rms_max_current: 0,
        rms_current_data_points: []
    },
    {
        id: 1,
        timestamp: 0,
        energy: 0,
        voltage: 0,
        power: 0,
        rms_min_current: 0,
        rms_avg_current: 0,
        rms_max_current: 0,
        rms_current_data_points: []
    }
];

class App extends React.Component {
    state = {
        data: channels,
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
                <Channel chartData={this.state.data[0]} />
                <Channel chartData={this.state.data[1]} />
            </div>
        );
    }
}

export default App;

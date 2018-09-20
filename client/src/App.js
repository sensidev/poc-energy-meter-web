import * as React from 'react';
import socketIOClient from 'socket.io-client';

import './App.css';

const ENDPOINT = 'http://127.0.0.1:8000';

const channels = [
    {
        id: 0,
        timestamp: 0,
        interval_ms: 60000,
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
        data: channels
    };

    componentDidMount() {
        const socket = socketIOClient(ENDPOINT);
        socket.on('channels', data => {
            console.log(data);
            this.setState({ data });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="panel">
                    <div className="row">
                        <p className="panel-label">Voltage</p>
                        <p className="panel-value">
                            {this.state.data[0].voltage} V
                        </p>
                    </div>
                    <div className="row">
                        <p className="panel-label">Power</p>
                        <p className="panel-value">
                            {this.state.data[0].power} W
                        </p>
                    </div>
                    <div className="row">
                        <p className="panel-label">Energy</p>
                        <p className="panel-value">
                            {this.state.data[0].energy} Wh
                        </p>
                    </div>
                    <div className="row">
                        <p className="panel-label">Min RMS Current</p>
                        <p className="panel-value">
                            {this.state.data[0].rms_min_current} A
                        </p>
                    </div>
                    <div className="row">
                        <p className="panel-label">Average RMS Current</p>
                        <p className="panel-value">
                            {this.state.data[0].rms_avg_current} A
                        </p>
                    </div>
                    <div className="row">
                        <p className="panel-label">Max RMS Current</p>
                        <p className="panel-value">
                            {this.state.data[0].rms_max_current} A
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

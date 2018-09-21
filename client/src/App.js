import * as React from 'react';
import socketIOClient from 'socket.io-client';

import { Channel } from './Channel';
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
    },
    {
        id: 1,
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
        data: channels,
        active: 5
    };

    componentDidMount() {
        const socket = socketIOClient(ENDPOINT);
        socket.on('channels', data => {
            this.setState({ data });
        });
    }

    emitToServer = (message, data) => {
        const socket = socketIOClient(ENDPOINT);
        socket.emit(message, data);
    };

    onClick = sec => {
        this.setState({ active: sec });
        this.emitToServer('seconds', sec);
    };

    render() {
        const { active } = this.state;

        return (
            <div className="container">
                <div className="buttons-container">
                    <div
                        className="button"
                        style={{
                            backgroundColor:
                                active === 1 ? '#637de2' : '#1d348c'
                        }}
                        onClick={() => this.onClick(1)}
                    >
                        1 sec
                    </div>
                    <div
                        className="button"
                        style={{
                            backgroundColor:
                                active === 5 ? '#637de2' : '#1d348c'
                        }}
                        onClick={() => this.onClick(5)}
                    >
                        5 sec
                    </div>
                    <div
                        className="button"
                        style={{
                            backgroundColor:
                                active === 30 ? '#637de2' : '#1d348c'
                        }}
                        onClick={() => this.onClick(30)}
                    >
                        30 sec
                    </div>
                    <div
                        className="button"
                        style={{
                            backgroundColor:
                                active === 60 ? '#637de2' : '#1d348c'
                        }}
                        onClick={() => this.onClick(60)}
                    >
                        60 sec
                    </div>
                </div>
                <Channel data={this.state.data[0]} />
                <Channel data={this.state.data[1]} />
            </div>
        );
    }
}

export default App;

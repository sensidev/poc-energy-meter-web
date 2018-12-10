import React from 'react';
import styled, {ThemeProvider} from 'styled-components';

import {CardSection} from '../components';
import {theme} from '../theme';
import {generate3PhaseMeter, map3PhaseMeter, STATUS} from '../helpers';
import socketIOClient from "socket.io-client";

const API_ROOT = process.env.REACT_APP_API_ROOT || 'http://localhost:8000';
const DISPLAY_TOTAL_VALUES = false;

export class Meter extends React.Component {
    socket = socketIOClient(API_ROOT, {path: '/ws'});

    constructor(props) {
        super(props);

        this.state = {
            total: {
                timestamp: new Date(Date.now()),
                values: [
                    {
                        key: 'TOTALP',
                        title: 'Total Power - on all 3 phases',
                        value: '-',
                        samples: [],
                        status: STATUS.Default
                    },
                    {
                        key: 'POWERFACTOR',
                        title: 'Power Factor - on all 3 phases',
                        value: '-',
                        samples: [],
                        status: STATUS.Default
                    },
                    {
                        key: 'TOTALE',
                        title: 'Total Energy - on all 3 phases',
                        value: '-',
                        samples: [],
                        status: STATUS.Default
                    }
                ]
            },
            meter: {
                timestamp: new Date(Date.now()),
                values: [
                    {
                        key: 'RP',
                        title: 'Phase R - avg power',
                        value: '-',
                        samples: [],
                        status: STATUS.Default
                    },
                    {
                        key: 'RI',
                        title: 'Phase R - rms intensity',
                        value: '-',
                        samples: [],
                        status: STATUS.Default
                    },
                    {
                        key: 'RV',
                        title: 'Phase R - rms voltage',
                        value: '-',
                        samples: [],
                        status: STATUS.Default
                    },
                    {
                        key: 'SP',
                        title: 'Phase S - avg power',
                        value: '-',
                        samples: [],
                        status: STATUS.Default
                    },
                    {
                        key: 'SI',
                        title: 'Phase S - rms intensity',
                        value: '-',
                        samples: [],
                        status: STATUS.Default
                    },
                    {
                        key: 'SV',
                        title: 'Phase S - rms voltage',
                        value: '-',
                        samples: [],
                        status: STATUS.Default
                    },
                    {
                        key: 'TP',
                        title: 'Phase T - avg power',
                        value: '-',
                        samples: [],
                        status: STATUS.Default
                    },
                    {
                        key: 'TI',
                        title: 'Phase T - rms intensity',
                        value: '-',
                        samples: [],
                        status: STATUS.Default
                    },
                    {
                        key: 'TV',
                        title: 'Phase T - rms voltage',
                        value: '-',
                        samples: [],
                        status: STATUS.Default
                    },
                    {
                        key: 'TEMP',
                        title: 'Temperature - average on all 3 phases',
                        value: '-',
                        samples: [],
                        status: STATUS.Default
                    },
                    {
                        key: 'VREF',
                        title: 'V Ref - on all 3 phases',
                        value: '-',
                        samples: [],
                        status: STATUS.Default
                    }
                ]
            }
        };
    }

    componentDidMount() {
        console.log('Connected to ', API_ROOT);

        this.socket.on('payload', payload => {

            console.log('Received state: ', payload);
            let euiHash = window.location.hash;
            let EUI = parseInt(euiHash.replace('#', ''));
            if (payload.state.reported.EUI === EUI) {
                const meter = map3PhaseMeter(payload.state.reported.data, false);
                this.setState({meter});
            }
        });

        // Just to simulate
        // this.simulateSampling();
        // setInterval(() => this.simulateSampling(), 1000);
    }

    simulateSampling = () => {
        const isTotal = true;
        const data = generate3PhaseMeter();

        const meter = map3PhaseMeter(data, !isTotal);
        const total = map3PhaseMeter(data, isTotal);
        this.setState({meter, total});
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    {/*<CardSection*/}
                        {/*data={this.state.total}*/}
                        {/*displayTotal={DISPLAY_TOTAL_VALUES}*/}
                    {/*/>*/}
                    <CardSection data={this.state.meter} numberOfSamples={60}/>
                </Container>
            </ThemeProvider>
        );
    }
}

const Container = styled.div`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100vw;
    background-color: ${props => props.theme.linkWater};
    padding: 4%;
`;

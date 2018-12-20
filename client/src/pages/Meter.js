import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import socketIOClient from 'socket.io-client';

import { CardSection } from '../components';
import { theme } from '../theme';
import {
    generate3PhaseMeter,
    map3PhaseMeter,
    get3MeterUnit,
    updateSamplesChart,
    updateValueChart,
    generateInitialMeterState,
    mapDebuggingMeter,
    getDebuggingUnit
} from '../helpers';

const API_ROOT = process.env.REACT_APP_API_ROOT || 'http://localhost:8000';

export class Meter extends React.Component {
    socket = socketIOClient(API_ROOT, { path: '/ws' });

    constructor(props) {
        super(props);

        this.state = generateInitialMeterState();
    }

    componentDidMount() {
        console.log('Connected to ', API_ROOT);

        this.socket.on('payload', payload => {
            console.log('Received state: ', payload);
            let euiHash = window.location.hash;
            let expectedEUI = parseInt(euiHash.replace('#', ''));
            let actualEUI = parseInt(payload.state.reported.EUI.substring(9));

            if (actualEUI === expectedEUI) {
                const meter = map3PhaseMeter(payload.state.reported);
                const debugging = mapDebuggingMeter(payload.state.reported);
                this.setState({ meter, debugging });
            }
        });

        // Just to simulate
        // this.simulateSampling();
        // setInterval(() => this.simulateSampling(), 5000);
    }

    // simulateSampling = () => {
    //     const payload = generate3PhaseMeter();

    //     const meter = map3PhaseMeter(payload.state.reported);
    //     const debugging = mapDebuggingMeter(payload.state.reported);
    //     this.setState({ meter, debugging });
    // };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <CardSection
                        data={this.state.meter}
                        getUnitHandler={get3MeterUnit}
                        updateChartHandler={updateSamplesChart}
                        numberOfSamples={60}
                    />
                    <CardSection
                        data={this.state.debugging}
                        row
                        getUnitHandler={getDebuggingUnit}
                        updateChartHandler={updateValueChart}
                    />
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

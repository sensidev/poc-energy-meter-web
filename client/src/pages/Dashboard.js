import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { Card } from '../components';
import { theme } from '../theme';
import {
    generateBear,
    generateEnergy,
    getDataFromJSON,
    updateChartData,
    getMeasurementUnit,
    STATUS
} from '../helpers';
import socketIOClient from 'socket.io-client';

const API_ROOT = process.env.REACT_APP_API_ROOT || 'http://localhost:8000';

export class Dashboard extends React.Component {
    socket = socketIOClient(API_ROOT, { path: '/ws' });

    constructor(props) {
        super(props);

        this.state = {
            alternate: false,
            bearData: {
                timestamp: new Date(Date.now()),
                values: [
                    {
                        key: 'temp',
                        title: 'Temperature',
                        value: '-',
                        status: STATUS.Default
                    },
                    {
                        key: 'hum',
                        title: 'Humidity',
                        value: '-',
                        status: STATUS.Ok
                    },
                    {
                        key: 'voc',
                        title: 'tVOC',
                        value: '-',
                        status: STATUS.Warning
                    },
                    {
                        key: 'co',
                        title: 'CO2',
                        value: '-',
                        status: STATUS.Warning
                    },
                    {
                        key: 'hcho',
                        title: 'Formaldehyde',
                        value: '-',
                        status: STATUS.Ok
                    },
                    {
                        key: 'pm',
                        title: 'PM2.5',
                        value: '-',
                        status: STATUS.Critical
                    }
                ]
            },
            enData: {
                timestamp: new Date(Date.now()),
                values: [
                    {
                        key: 'cur',
                        title: 'Current',
                        value: '-',
                        status: STATUS.Default
                    },
                    {
                        key: 'pow',
                        title: 'Power',
                        value: '-',
                        status: STATUS.Default
                    },
                    {
                        key: 'en',
                        title: 'Energy',
                        value: '-',
                        status: STATUS.Ok
                    }
                ]
            }
        };
    }

    getProcessedStateFor(payload) {
        let processedState = {};

        processedState['timestamp'] = new Date(payload.timestamp * 1000);
        processedState['values'] = [];

        if (payload.state.reported.data.temperature !== undefined) {
            processedState['values'].push({
                key: 'temp',
                title: 'Temperature',
                // Uber hack, to compensate the heat from inside the enclosure :)
                value: payload.state.reported.data.temperature - 4,
                status: STATUS.Default
            });
        }
        if (payload.state.reported.data.humidity !== undefined) {
            processedState['values'].push({
                key: 'hum',
                title: 'Humidity',
                value: payload.state.reported.data.humidity,
                status: STATUS.Ok
            });
        }
        if (payload.state.reported.data.TVOC !== undefined) {
            processedState['values'].push({
                key: 'voc',
                title: 'tVOC',
                value: payload.state.reported.data.TVOC,
                status: STATUS.Warning
            });
        }
        if (payload.state.reported.data.HCHO !== undefined) {
            processedState['values'].push({
                key: 'hcho',
                title: 'Formaldehyde',
                value: payload.state.reported.data.HCHO,
                status: STATUS.Ok
            });
        }
        if (payload.state.reported.data.CO2 !== undefined) {
            processedState['values'].push({
                key: 'co',
                title: 'CO2',
                value: payload.state.reported.data.CO2,
                status: STATUS.Warning
            });
        }
        if (payload.state.reported.data.PM25 !== undefined) {
            processedState['values'].push({
                key: 'pm',
                title: 'PM2.5',
                value: payload.state.reported.data.PM25,
                status: STATUS.Critical
            });
        }
        if (payload.state.reported.data.current !== undefined) {
            processedState['values'].push({
                key: 'cur',
                title: 'Current',
                value: payload.state.reported.data.current,
                status: STATUS.Default
            });
        }
        if (payload.state.reported.data.power !== undefined) {
            processedState['values'].push({
                key: 'pow',
                title: 'Power',
                value: payload.state.reported.data.power,
                status: STATUS.Default
            });
        }
        if (payload.state.reported.data.energy !== undefined) {
            processedState['values'].push({
                key: 'en',
                title: 'Energy',
                value: payload.state.reported.data.energy,
                status: STATUS.Ok
            });
        }

        return processedState;
    }

    componentDidMount() {
        console.log('Connected to ', API_ROOT);

        this.socket.on('payload', payload => {
            console.log('Received state: ', payload);
            const data = this.getProcessedStateFor(payload);
            if (payload.state.reported.type === 'energy') {
                this.setState({ enData: data, alternate: false });
            } else {
                this.setState({ bearData: data, alternate: true });
            }
        });

        // TODO: REMOVE ME
        // setInterval(() => this.simulateSampling(), 1000);
    }

    simulateSampling = () => {
        if (this.state.alternate) {
            const data = generateEnergy();
            const enData = getDataFromJSON(data);
            this.setState({ enData, alternate: false });
        } else {
            const data = generateBear();
            const bearData = getDataFromJSON(data);
            this.setState({ bearData, alternate: true });
        }
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <List>
                        {this.state.bearData.values.map((item, index) => (
                            <Card
                                item={item}
                                timestamp={this.state.bearData.timestamp}
                                key={item.key}
                                width="30%"
                                height="28vh"
                                chartScaleX={1.2}
                                getUnitHandler={getMeasurementUnit}
                                updateChartHandler={updateChartData}
                                spacing={(index + 2) % 3 === 0}
                                space="1.5rem"
                            />
                        ))}
                        {this.state.enData.values.map((item, index) => (
                            <Card
                                item={item}
                                timestamp={this.state.enData.timestamp}
                                key={item.key}
                                width="30%"
                                height="28vh"
                                chartScaleX={1.2}
                                getUnitHandler={getMeasurementUnit}
                                updateChartHandler={updateChartData}
                                spacing={(index + 2) % 3 === 0}
                                space="1.5rem"
                            />
                        ))}
                    </List>
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
    height: 100vh;
    background-color: ${props => props.theme.linkWater};
    display: flex;
    justify-content: center;
    padding: 4rem 0;
`;

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

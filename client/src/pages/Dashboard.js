import React from 'react';
import styled, {ThemeProvider} from 'styled-components';

import {Card} from '../components';
import {Icons, theme} from '../theme';
import {getDataFromJSON, STATUS} from '../helpers';
import socketIOClient from "socket.io-client";

const API_ROOT = process.env.REACT_APP_API_ROOT || 'http://localhost:8000';

export class Dashboard extends React.Component {
    socket = socketIOClient(API_ROOT, {path: '/ws'});

    constructor(props) {
        super(props);

        this.state = {
            data: getDataFromJSON()
        };
    }

    getProcessedStateFor(payload) {
        let processedState = {};

        processedState['timestamp'] = new Date(payload.timestamp * 1000);

        processedState['values'] = [
            {
                key: 'temp',
                title: 'Temperature',
                value: payload.state.reported.data.temperature || null,
                status: STATUS.Default
            },
            {
                key: 'hum',
                title: 'Humidity',
                value: payload.state.reported.data.humidity || null,
                status: STATUS.Default
            },
            {
                key: 'voc',
                title: 'tVOC',
                value: payload.state.reported.data.TVOC || null,
                status: STATUS.Warning
            },
            {
                key: 'co',
                title: 'CO2',
                value: payload.state.reported.data.CO2 || null,
                status: STATUS.Critical
            },
            {
                key: 'hcho',
                title: 'Formaldehyde',
                value: payload.state.reported.data.HCHO || null,
                status: STATUS.Ok
            },
            {
                key: 'pm',
                title: 'PM2.5',
                value: payload.state.reported.data.PM25 || null,
                status: STATUS.Default
            },
            {
                key: 'cur',
                title: 'Current',
                value: payload.state.reported.data.current || null,
                status: STATUS.Default
            },
            {
                key: 'pow',
                title: 'Power',
                value: payload.state.reported.data.power || null,
                status: STATUS.Default
            },
            {
                key: 'en',
                title: 'Energy',
                value: payload.state.reported.data.energy || null,
                status: STATUS.Default
            }
        ];

        return processedState;
    }

    componentDidMount() {
        console.log('Connected to ', API_ROOT);

        this.socket.on('payload', payload => {
            console.log('Received state: ', payload);
            const data = this.getProcessedStateFor(payload);
            this.setState({data})
        });

        // TODO: REMOVE ME
        // setInterval(() => this.simulateSampling(), SAMPLING_TIME);
    }

    simulateSampling = () => {
        const data = getDataFromJSON();
        this.setState({data});
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <List>
                        {this.state.data.values.map(item => (
                            <Card
                                item={item}
                                timestamp={this.state.data.timestamp}
                                key={item.key}
                            />
                        ))}
                    </List>
                    <Contact>
                        <Logo src={Icons.logo}/>
                        <Site>sensix.io</Site>
                    </Contact>
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
`;

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-top: 2rem;
`;

const Contact = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1rem 0;
`;

const Logo = styled.img`
    height: 7.2rem;
    width: 7.2rem;
    border-radius: 50%;
    margin-bottom: 1rem;
`;

const Site = styled.h3`
    margin: 0;
    color: ${props => props.theme.default};
`;

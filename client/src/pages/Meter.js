import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { Card } from '../components';
import { theme } from '../theme';
import { generate3PhaseMeter, map3PhaseMeter, STATUS } from '../helpers';

export class Meter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
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
                        status: STATUS.Warning
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
                        status: STATUS.Warning
                    },
                    {
                        key: 'SV',
                        title: 'Phase S - rms voltage',
                        value: '-',
                        samples: [],
                        status: STATUS.Critical
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
                        status: STATUS.Warning
                    },
                    {
                        key: 'TV',
                        title: 'Phase T - rms voltage',
                        value: '-',
                        samples: [],
                        status: STATUS.Critical
                    }
                ]
            }
        };
    }

    componentDidMount() {
        this.simulateSampling();
        setInterval(() => this.simulateSampling(), 1000);
    }

    simulateSampling = () => {
        const meter = generate3PhaseMeter();
        const data = map3PhaseMeter(meter);
        this.setState({ data });
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
                                width="90%"
                                height="30vh"
                                chartScaleX={1.09}
                                meter
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
    background-color: ${props => props.theme.linkWater};
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4rem 0;
`;

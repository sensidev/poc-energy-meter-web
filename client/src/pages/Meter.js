import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { Card } from '../components';
import { theme } from '../theme';
import { generate3PhaseMeter, map3PhaseMeter, STATUS } from '../helpers';

export class Meter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTotalValues: true,
            TotalPhaseData: {
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
            ThreePhaseData: {
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
                    },
                    {
                        key: 'TEMP',
                        title: 'Temperature - average on all 3 phases',
                        value: '-',
                        samples: [],
                        status: STATUS.Critical
                    },
                    {
                        key: 'VREF',
                        title: 'V Ref - on all 3 phases',
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
        const ThreePhaseMeter = generate3PhaseMeter();
        const ThreePhaseData = map3PhaseMeter(ThreePhaseMeter);
        this.setState({ ThreePhaseData });
    };

    // handleCheckboxChange = () => {
    //     const { checked } = this.state;

    //     if (checked) {
    //         this.setState({ checked: false });
    //     } else {
    //         this.setState({ checked: true });
    //     }
    // };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    {/* <CheckboxContainer>
                        <CheckboxLabel htmlFor="show-total-values-checkbox">
                            Show total values
                        </CheckboxLabel>
                        <Checkbox
                            type="checkbox"
                            name="show-total-values-checkbox"
                            id="show-total-values-checkbox"
                            checked={this.state.checked}
                            onChange={this.handleCheckboxChange}
                        />
                    </CheckboxContainer> */}
                    {this.state.showTotalValues && (
                        <TotalPhaseList>
                            {this.state.TotalPhaseData.values.map(item => (
                                <Card
                                    item={item}
                                    timestamp={
                                        this.state.TotalPhaseData.timestamp
                                    }
                                    key={item.key}
                                    width="29.3%"
                                    height="30vh"
                                    chartScaleX={1.06}
                                    meter
                                />
                            ))}
                        </TotalPhaseList>
                    )}
                    <ThreePhaseList>
                        {this.state.ThreePhaseData.values.map(item => (
                            <Card
                                item={item}
                                timestamp={this.state.ThreePhaseData.timestamp}
                                key={item.key}
                                width="90%"
                                height="30vh"
                                chartScaleX={1.09}
                                meter
                            />
                        ))}
                    </ThreePhaseList>
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

const CheckboxContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4rem 0 2rem 10rem;
`;

const CheckboxLabel = styled.label`
    color: ${props => props.theme.black};
    margin-right: 1rem;
    font-family: 'IBM Plex Mono';
    font-weight: bolder;
    font-size: 2.1rem;
`;

const Checkbox = styled.input`
    zoom: 2;
`;

const TotalPhaseList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 2rem;
    /* width: 80%; */
`;

const ThreePhaseList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

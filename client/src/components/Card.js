import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {BarChart} from './BarChart';
import {Icons} from '../theme';
import {DIGITS, getMeasurementUnit, STATUS, updateChartData} from '../helpers';
import {Timestamp} from "./Timestamp";

export class Card extends React.Component {
    state = {
        value: 0,
        count: 0,
        sum: 0,
        min: {
            value: '-',
            timestamp: '-'
        },
        max: {
            value: '-',
            timestamp: '-'
        },
        avg: {
            value: '-',
            timestamp: '-'
        },
        energy: 0,
        chartData: []
    };

    static getMax(nextProps, currentState) {
        const nextValue = nextProps.item.value;
        const currentValue = currentState.max.value;

        let max = {
            value: nextValue,
            timestamp: moment(nextProps.timestamp)
                .fromNow()
                .toLocaleUpperCase()
        };

        if (!isNaN(currentValue)) {
            if (nextValue <= currentValue) {
                max = currentState.max
            }
        }

        return max;
    }

    static getMin(nextProps, currentState) {
        const nextValue = nextProps.item.value;
        const currentValue = currentState.min.value;

        let min = {
            value: nextValue,
            timestamp: moment(nextProps.timestamp)
                .fromNow()
                .toLocaleUpperCase()
        };

        if (!isNaN(currentValue)) {
            if (nextValue >= currentValue) {
                min = currentState.min
            }

        }
        return min;
    }

    static getDerivedStateFromProps(nextProps, currentState) {
        const {value, key} = nextProps.item;
        const {count, sum, chartData} = currentState;

        if (count === 0) {
            return {
                count: 1,
                sum: value,
                min: {
                    value: '-',
                    timestamp: '-'
                },
                max: {
                    value: '-',
                    timestamp: '-'
                },
                avg: {
                    value: '-',
                    timestamp: '-'
                },
                energy: key === 'en' ? value : 0,
                chartData: []
            };
        } else {
            return {
                count: count + 1,
                sum: sum + value,
                min: Card.getMin(nextProps, currentState),
                max: Card.getMax(nextProps, currentState),
                avg: {
                    value: (sum / count).toFixed(2),
                    timestamp: new Date(Date.now())
                },
                energy:
                    key === 'en'
                        ? currentState.energy + value
                        : currentState.energy,
                chartData:
                    value !== currentState.value
                        ? updateChartData(chartData, value)
                        : chartData,
                value
            };
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.item !== this.props.item;
    }

    render() {
        const {key, title, value, status} = this.props.item;
        const {min, avg, max, energy} = this.state;

        const fixedEnergy = +energy.toFixed(DIGITS);
        const transformedEnergy = getMeasurementUnit('en', fixedEnergy);
        const transformedValue = getMeasurementUnit(key, value);

        const minValue = getMeasurementUnit(key, min.value);
        const avgValue = getMeasurementUnit(key, avg.value);
        const maxValue = getMeasurementUnit(key, max.value);

        return (
            <Container>
                <Header>
                    <Info>
                        <Title>{title}</Title>
                        <Value color={status}>
                            {key === 'en'
                                ? transformedEnergy
                                : transformedValue}
                        </Value>
                    </Info>
                    <StatusContainer>
                        <Timestamp timestamp={this.props.timestamp}/>
                        {status !== STATUS.Default && (
                            <Status src={Icons[status]}/>
                        )}
                    </StatusContainer>
                </Header>
                <ChartContainer color={status}>
                    <BarChart chartData={this.state.chartData} color={status}/>
                </ChartContainer>
                <Footer>
                    <Statistics>
                        <Details>
                            <Threshold>LOWEST</Threshold>
                            <Arrow src={Icons.down}/>
                            <StyledDate>{this.state.min.timestamp}</StyledDate>
                        </Details>
                        <Stat>{minValue}</Stat>
                    </Statistics>
                    <Statistics>
                        <Details>
                            <Threshold>AVERAGE</Threshold>
                        </Details>
                        <Stat>{avgValue}</Stat>
                    </Statistics>
                    <Statistics>
                        <Details>
                            <Threshold color={status}>HIGHEST</Threshold>
                            <Arrow src={Icons.top}/>
                            <StyledDate color={status}>{this.state.max.timestamp}</StyledDate>
                        </Details>
                        <Stat color={status}>{maxValue}</Stat>
                    </Statistics>
                </Footer>
            </Container>
        );
    }
}

Card
    .propTypes = {
    item: PropTypes.object.isRequired,
    timestamp: PropTypes.instanceOf(Date)
};

const
    Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 25vh;
    width: 30%;
    background-color: ${props => props.theme.white};
    margin: 10px;
    border-radius: 10px;
    padding: 1rem 2rem;
`;

const
    Header = styled.div`
    display: flex;
    flex: 1;
    padding-bottom: 1rem;
`;

const
    Info = styled.div`
    display: flex;
    flex-direction: column;
    flex: 10;
`;

const
    Title = styled.p`
    color: ${props => props.theme.default};
    margin: 0;
`;

const
    Value = styled.h3`
    color: ${props =>
        props.theme[props.color]
            ? props.theme[props.color]
            : props.theme.default};
    margin: 0;
`;

const
    StatusContainer = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const
    Status = styled.img`
    width: 2rem;
    height: 2rem;
    margin-top: 1rem;
`;

const
    ChartContainer = styled.div`
    flex: 2;
    transform: scaleX(1.2);
`;

const
    Footer = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 1;
`;

const
    Statistics = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const
    Details = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
`;

const
    Threshold = styled.h6`
    color: ${props =>
        props.theme[props.color]
            ? props.theme[props.color]
            : props.theme.threshold};
    margin: 0;
`;

const
    Arrow = styled.img`
    width: 1rem;
    height: 1rem;
    margin: 0 0.5rem;
    margin-bottom: 0.1rem;
`;

const
    StyledDate = styled.h6`
    color: ${props =>
        props.theme[props.color]
            ? props.theme[props.color]
            : props.theme.threshold};
    margin: 0;
`;

const
    Stat = styled.p`
    color: ${props =>
        props.theme[props.color]
            ? props.theme[props.color]
            : props.theme.threshold};
    margin: 0;
`;

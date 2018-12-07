import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BarChart } from './BarChart';
import { Icons } from '../theme';
import {
    DIGITS,
    getMeasurementUnit,
    get3MeterUnit,
    STATUS,
    updateChartData,
    update3MeterChart
} from '../helpers';
import { Timestamp } from './Timestamp';

export class Card extends React.Component {
    state = {
        value: '-',
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
            value: '-'
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
        };

        if (!isNaN(currentValue)) {
            if (nextValue <= currentValue) {
                max = currentState.max;
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
        };

        if (!isNaN(currentValue)) {
            if (nextValue >= currentValue) {
                min = currentState.min;
            }
        }
        return min;
    }

    static getEnergy(nextProps, currentState) {
        const { value, key } = nextProps.item;

        if (!isNaN(value)) {
            if (key === 'en') {
                return currentState.energy + value;
            }
        }

        return currentState.energy;
    }

    static getAvg(nextProps, currentState) {
        const { value } = nextProps.item;
        const { sum, count } = currentState;

        if (!isNaN(value)) {
            return {
                value: +(sum / count).toFixed(2)
            };
        }

        return {
            value: '-'
        };
    }

    static getDerivedStateFromProps(nextProps, currentState) {
        const { item, meter } = nextProps;
        const { value } = item;
        const { count, sum } = currentState;

        return {
            count: !isNaN(value) ? count + 1 : count,
            sum: sum + (!isNaN(value) ? value : 0),
            min: Card.getMin(nextProps, currentState),
            max: Card.getMax(nextProps, currentState),
            avg: Card.getAvg(nextProps, currentState),
            energy: Card.getEnergy(nextProps, currentState),
            chartData: !meter
                ? updateChartData(nextProps, currentState)
                : update3MeterChart(nextProps, currentState)
        };
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.item !== this.props.item;
    }

    render() {
        const { key, title, value, status } = this.props.item;
        const { min, avg, max, energy } = this.state;
        const transform = this.props.meter ? get3MeterUnit : getMeasurementUnit;

        const fixedEnergy = +energy.toFixed(DIGITS);
        const transformedEnergy = transform('en', fixedEnergy);
        const transformedValue = transform(key, value);

        const minValue = transform(key, min.value);
        const avgValue = transform(key, avg.value);
        const maxValue = transform(key, max.value);

        return (
            <Container width={this.props.width} height={this.props.height}>
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
                        <Timestamp timestamp={this.props.timestamp} />
                        {status !== STATUS.Default && (
                            <Status src={Icons[status]} />
                        )}
                    </StatusContainer>
                </Header>
                <ChartContainer scaleX={this.props.chartScaleX} color={status}>
                    <BarChart
                        barThickness={2}
                        chartData={this.state.chartData}
                        color={status}
                    />
                </ChartContainer>
                <Footer>
                    <Statistics>
                        <Details>
                            <Threshold>LOWEST</Threshold>
                            <Arrow src={Icons.down} />
                            <StyledDate>
                                {this.state.min.timestamp.fromNow().toLocaleUpperCase()}
                            </StyledDate>
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
                            <Arrow src={Icons.top} />
                            <StyledDate color={status}>
                                {this.state.max.timestamp.fromNow().toLocaleUpperCase()}
                            </StyledDate>
                        </Details>
                        <Stat color={status}>{maxValue}</Stat>
                    </Statistics>
                </Footer>
            </Container>
        );
    }
}

Card.propTypes = {
    item: PropTypes.object.isRequired,
    meter: PropTypes.bool,
    timestamp: PropTypes.instanceOf(Date),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    chartScaleX: PropTypes.number
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: ${props => (props.height ? props.height : '100%')};
    width: ${props => (props.width ? props.width : '100%')};
    background-color: ${props => props.theme.white};
    margin: 10px;
    border-radius: 10px;
    padding: 1rem 2rem;
`;

const Header = styled.div`
    display: flex;
    flex: 1;
    padding-bottom: 1rem;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    flex: 10;
`;

const Title = styled.p`
    color: ${props => props.theme.default};
    margin: 0;
`;

const Value = styled.h3`
    color: ${props =>
        props.theme[props.color]
            ? props.theme[props.color]
            : props.theme.default};
    margin: 0;
`;

const StatusContainer = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const Status = styled.img`
    width: 2rem;
    height: 2rem;
    margin-top: 1rem;
`;

const ChartContainer = styled.div`
    flex: 2;
    transform: ${props =>
        props.scaleX ? `scaleX(${props.scaleX})` : 'scaleX(1)'};
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 1;
`;

const Statistics = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Details = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
`;

const Threshold = styled.h6`
    color: ${props =>
        props.theme[props.color]
            ? props.theme[props.color]
            : props.theme.threshold};
    margin: 0;
`;

const Arrow = styled.img`
    width: 1rem;
    height: 1rem;
    margin: 0 0.5rem;
    margin-bottom: 0.1rem;
`;

const StyledDate = styled.h6`
    color: ${props =>
        props.theme[props.color]
            ? props.theme[props.color]
            : props.theme.threshold};
    margin: 0;
`;

const Stat = styled.p`
    color: ${props =>
        props.theme[props.color]
            ? props.theme[props.color]
            : props.theme.threshold};
    margin: 0;
`;

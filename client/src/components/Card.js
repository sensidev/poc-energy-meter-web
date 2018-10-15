import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BarChart } from './BarChart';
import { Icons } from '../theme';
import {
    getMeasurementUnit,
    updateChartData,
    STATUS,
    DIGITS
} from '../helpers';

export class Card extends React.Component {
    state = {
        count: 0,
        sum: 0,
        min: {
            value: 0,
            timestamp: new Date(Date.now())
        },
        max: {
            value: 0,
            timestamp: new Date(Date.now())
        },
        avg: {
            value: 0,
            timestamp: new Date(Date.now())
        },
        energy: 0,
        chartData: []
    };

    static getDerivedStateFromProps(nextProps, currentState) {
        const { value, key } = nextProps.item;
        const { count, sum, min, max, chartData } = currentState;

        if (count === 0) {
            return {
                count: 1,
                sum: value,
                min: {
                    value,
                    timestamp: new Date(Date.now())
                },
                max: {
                    value,
                    timestamp: new Date(Date.now())
                },
                avg: {
                    value,
                    timestamp: new Date(Date.now())
                },
                energy: key === 'en' ? value : 0,
                chartData: updateChartData(chartData, value)
            };
        } else {
            return {
                count: count + 1,
                sum: sum + value,
                min:
                    value < min.value
                        ? {
                              value,
                              timestamp: new Date(Date.now())
                          }
                        : min,
                max:
                    value > max.value
                        ? {
                              value,
                              timestamp: new Date(Date.now())
                          }
                        : max,
                avg: {
                    value: (sum / count).toFixed(2),
                    timestamp: new Date(Date.now())
                },
                energy:
                    key === 'en'
                        ? currentState.energy + value
                        : currentState.energy,
                chartData: updateChartData(chartData, value)
            };
        }
    }

    render() {
        const { key, title, value, status } = this.props.item;
        const { min, avg, max, energy } = this.state;

        const fixedEnergy = +energy.toFixed(DIGITS);
        const transformedEnergy = getMeasurementUnit('en', fixedEnergy);
        const transformedValue = getMeasurementUnit(key, value);

        const minValue = getMeasurementUnit(key, min.value);
        const avgValue = getMeasurementUnit(key, avg.value);
        const maxValue = getMeasurementUnit(key, max.value);

        const minDate = moment(min.timestamp)
            .fromNow()
            .toLocaleUpperCase();
        const maxDate = moment(max.timestamp)
            .fromNow()
            .toLocaleUpperCase();
        const lastSample = moment(this.props.timestamp).fromNow();

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
                        <Timestamp>{lastSample} ago</Timestamp>
                        {status !== STATUS.Default && (
                            <Status src={Icons[status]} />
                        )}
                    </StatusContainer>
                </Header>
                <ChartContainer color={status}>
                    <BarChart chartData={this.state.chartData} color={status} />
                </ChartContainer>
                <Footer>
                    <Statistics>
                        <Details>
                            <Threshold>LOWEST</Threshold>
                            <Arrow src={Icons.down} />
                            <StyledDate>{minDate}</StyledDate>
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
                            <StyledDate color={status}>{maxDate}</StyledDate>
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
    timestamp: PropTypes.instanceOf(Date)
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 25vh;
    width: 30%;
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

const Timestamp = styled.p`
    color: ${props => props.theme.default};
    margin: 0;
`;

const ChartContainer = styled.div`
    flex: 2;
    transform: scaleX(1.2);
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

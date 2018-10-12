import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getMeasurementUnit } from '../helpers';

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
        }
    };

    static getDerivedStateFromProps(nextProps, currentState) {
        const { value } = nextProps.item;
        const { count, sum, min, max } = currentState;

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
                }
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
                }
            };
        }
    }

    render() {
        const { key, title, value } = this.props.item;
        const { min, avg, max } = this.state;

        const transformedValue = getMeasurementUnit(key, value);
        const minValue = getMeasurementUnit(key, min.value);
        const avgValue = getMeasurementUnit(key, avg.value);
        const maxValue = getMeasurementUnit(key, max.value);

        const minDate = moment(min.timestamp)
            .fromNow()
            .toLocaleUpperCase();
        const avgDate = moment(avg.timestamp)
            .fromNow()
            .toLocaleUpperCase();
        const maxDate = moment(max.timestamp)
            .fromNow()
            .toLocaleUpperCase();

        return (
            <Container>
                <Header>
                    <SmallDotContainer>
                        <SmallDot color={key} />
                    </SmallDotContainer>
                    <Info>
                        <Title>{title}</Title>
                        <Value>{transformedValue}</Value>
                    </Info>
                    <BigDotContainer>
                        <BigDot color={key} />
                    </BigDotContainer>
                </Header>
                <Chart color={key} />
                <Footer>
                    <Statistics>
                        <Details>
                            <Threshold color={key}>LOWEST -</Threshold>
                            <StyledDate>{minDate}</StyledDate>
                        </Details>
                        <Stat>{minValue}</Stat>
                    </Statistics>
                    <Statistics>
                        <Details>
                            <Threshold color={key}>AVERAGE -</Threshold>
                            <StyledDate>{avgDate}</StyledDate>
                        </Details>
                        <Stat>{avgValue}</Stat>
                    </Statistics>
                    <Statistics>
                        <Details>
                            <Threshold color={key}>HIGHEST -</Threshold>
                            <StyledDate>{maxDate}</StyledDate>
                        </Details>
                        <Stat>{maxValue}</Stat>
                    </Statistics>
                </Footer>
            </Container>
        );
    }
}

Card.propTypes = {
    item: PropTypes.object.isRequired
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 400px;
    width: calc(50% - 40px);
    background-color: ${props => props.theme.white};
    margin: 20px;
    border-radius: 10px;
    overflow: hidden;
    padding: 2%;
`;

const Header = styled.div`
    display: flex;
    flex: 1;
    padding-bottom: 1rem;
`;

const SmallDotContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding-top: 0.2rem;
`;

const SmallDot = styled.div`
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    background-color: ${props =>
        props.theme[props.color]
            ? props.theme[props.color]
            : props.theme.default};
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    flex: 10;
    padding: 0 1rem;
`;

const Title = styled.h3`
    color: ${props => props.theme.boulder};
    margin: 0;
`;

const Value = styled.h2`
    color: ${props => props.theme.emperor};
    margin: 0;
`;

const BigDotContainer = styled.div`
    flex: 2;
    display: flex;
    justify-content: flex-end;
`;

const BigDot = styled.div`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: ${props =>
        props.theme[props.color]
            ? props.theme[props.color]
            : props.theme.default};
`;

const Chart = styled.div`
    flex: 4;
    background-color: ${props =>
        props.theme[props.color]
            ? props.theme[props.color]
            : props.theme.default};
`;

const Footer = styled.div`
    display: flex;
    flex: 1;
`;

const Statistics = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Details = styled.div`
    display: flex;
`;

const Threshold = styled.h4`
    color: ${props =>
        props.theme[props.color]
            ? props.theme[props.color]
            : props.theme.default};
    margin: 0.5rem 0;
`;

const StyledDate = styled.h4`
    color: ${props => props.theme.silverChalice};
    padding-left: 0.5rem;
    margin: 0;
    margin-top: 0.5rem;
`;

const Stat = styled.h3`
    color: ${props => props.theme.emperor};
    margin: 0;
`;

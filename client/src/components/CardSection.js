import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Card } from './Card';

export class CardSection extends React.Component {
    render() {
        const {
            row,
            data,
            getUnitHandler,
            updateChartHandler,
            numberOfSamples
        } = this.props;

        if (row) {
            return (
                <Row>
                    {data.values.map(item => (
                        <Card
                            item={item}
                            timestamp={data.timestamp}
                            key={item.key}
                            width="32%"
                            height="28vh"
                            chartScaleX={1.1}
                            getUnitHandler={getUnitHandler}
                            updateChartHandler={updateChartHandler}
                        />
                    ))}
                </Row>
            );
        } else {
            return (
                <Column>
                    {data.values.map(item => (
                        <Card
                            item={item}
                            timestamp={data.timestamp}
                            key={item.key}
                            width="98.3%"
                            height="30vh"
                            chartScaleX={1.1}
                            getUnitHandler={getUnitHandler}
                            updateChartHandler={updateChartHandler}
                            numberOfSamples={numberOfSamples}
                        />
                    ))}
                </Column>
            );
        }
    }
}

CardSection.propTypes = {
    data: PropTypes.object.isRequired,
    getUnitHandler: PropTypes.func.isRequired,
    updateChartHandler: PropTypes.func.isRequired,
    numberOfSamples: PropTypes.number,
    row: PropTypes.bool
};

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

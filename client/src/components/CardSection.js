import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Card } from './Card';
import { get3MeterUnit, update3MeterChart, updateTotalChart } from '../helpers';

export class CardSection extends React.Component {
    render() {
        if (this.props.displayTotal) {
            return (
                <TotalPhaseList>
                    {this.props.data.values.map((item, index) => (
                        <Card
                            item={item}
                            timestamp={this.props.data.timestamp}
                            key={item.key}
                            height="30vh"
                            chartScaleX={1.22}
                            getUnitHandler={get3MeterUnit}
                            updateChartHandler={updateTotalChart}
                            middle={(index + 2) % 3 === 0}
                        />
                    ))}
                </TotalPhaseList>
            );
        } else {
            return (
                <ThreePhaseList>
                    {this.props.data.values.map(item => (
                        <Card
                            item={item}
                            timestamp={this.props.data.timestamp}
                            key={item.key}
                            height="30vh"
                            chartScaleX={1.09}
                            getUnitHandler={get3MeterUnit}
                            updateChartHandler={update3MeterChart}
                            numberOfSamples={this.props.numberOfSamples}
                        />
                    ))}
                </ThreePhaseList>
            );
        }
    }
}

CardSection.propTypes = {
    data: PropTypes.object.isRequired,
    numberOfSamples: PropTypes.number
};

const TotalPhaseList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ThreePhaseList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

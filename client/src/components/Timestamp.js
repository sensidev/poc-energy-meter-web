import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export class Timestamp extends React.Component {
    state = {
        sinceLastSample: moment(new Date()).fromNow()
    };


    componentDidMount() {
        setInterval(() => this.tick(), 1000);
    }

    tick() {
        this.setState({sinceLastSample: moment(this.props.timestamp).fromNow()});
    }

    render() {

        return (
            <Style>{this.state.sinceLastSample}</Style>
        );
    }
}

Timestamp
    .propTypes = {
    timestamp: PropTypes.instanceOf(Date)
};

const
    Style = styled.p`
    color: ${props => props.theme.default};
    margin: 0;
`;

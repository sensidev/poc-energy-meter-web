import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Input = ({ value, name, placeholder, onChange, type }) => (
    <StyledInput
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
    />
);

Input.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

const StyledInput = styled.input`
    background-color: ${props => props.theme.white};
    border: none;
    border-radius: 0.5rem;
    font-size: 2rem;
    padding: 2rem;
    height: 6rem;
    width: 25%;
    margin-bottom: 1rem;
`;

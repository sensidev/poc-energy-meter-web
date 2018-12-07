import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Input = ({ value, name, placeholder, onChange }) => (
    <StyledInput
        placeholder={placeholder}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
    />
);

Input.propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
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

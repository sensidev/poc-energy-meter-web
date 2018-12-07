import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { Input } from '../components';
import { Icons, theme } from '../theme';

export class Device extends React.Component {
    state = {
        values: {
            device: '',
            tag: '',
            samplesToSendPerUnit: 60
        }
    };

    onChange = event => {
        this.setState({
            values: {
                ...this.state.values,
                [event.target.name]: event.target.value
            }
        });
    };

    onSubmit = () => {
        if (
            this.state.values.device.length === 0 ||
            this.state.values.tag.length === 0
        ) {
            alert('All fields are required.');
        } else {
        }
    };

    render() {
        console.log(this.props);
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <Logo src={Icons.logo} />
                    <Site>sensix.io</Site>
                    <Input
                        type="text"
                        value={this.state.values.device}
                        name="device"
                        placeholder="Device name"
                        onChange={this.onChange}
                    />
                    <Input
                        type="text"
                        value={this.state.values.tag}
                        name="tag"
                        placeholder="Sensing unit tag"
                        onChange={this.onChange}
                    />
                    <SamplesToSendContainer>
                        <SampleLabelContainer>
                            <SampleLabel>Samples to send per unit</SampleLabel>
                        </SampleLabelContainer>
                        <SampleInput
                            type="number"
                            value={this.state.values.samplesToSendPerUnit}
                            name="samplesToSendPerUnit"
                            onChange={this.onChange}
                        />
                    </SamplesToSendContainer>
                    <Button>
                        <Label>Submit</Label>
                    </Button>
                </Container>
            </ThemeProvider>
        );
    }
}

const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    padding: 1rem 0;
    background-color: ${props => props.theme.linkWater};
`;

const SamplesToSendContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 25%;
    height: 6rem;
`;

const SampleLabelContainer = styled.div`
    color: ${props => props.theme.default};
    padding-left: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SampleLabel = styled.h3`
    color: ${props => props.theme.default};
`;

const SampleInput = styled.input`
    display: inline-block;
    text-align: right;
    background-color: ${props => props.theme.white};
    border: none;
    border-radius: 0.5rem;
    font-size: 2rem;
    padding: 2rem;
    height: 6rem;
    width: 8rem;
    margin-bottom: 1rem;
`;

const Logo = styled.img`
    height: 10rem;
    width: 10rem;
    border-radius: 50%;
    margin: 1rem;
`;

const Site = styled.h1`
    margin: 0;
    color: ${props => props.theme.default};
    margin-bottom: 5rem;
`;

const Label = styled.h3`
    margin: 0;
    color: ${props => props.theme.white};
    text-align: 'center';
`;

const Button = styled.div`
    background-color: ${props => props.theme.default};
    border-radius: 0.5rem;
    color: ${props => props.theme.white};
    width: 10%;
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
    margin-top: 2rem;

    &:hover {
        cursor: pointer;
        box-shadow: 0.2rem 0.2rem 1.5rem 0 rgba(0, 0, 0, 0.5);
    }
`;

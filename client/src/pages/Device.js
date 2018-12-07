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

    render() {
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
                        <SampleLabel>Samples to send per unit</SampleLabel>
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
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
`;

const SampleLabel = styled.h3`
    width: 6%;
    color: ${props => props.theme.white};
    margin-right: 3rem;
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
`;

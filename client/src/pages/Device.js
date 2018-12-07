import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { Input } from '../components';
import { Icons, theme } from '../theme';

export class Device extends React.Component {
    state = {
        values: {
            device: '',
            tag: ''
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
                        value={this.state.values.device}
                        name="device"
                        placeholder="Device name"
                        onChange={this.onChange}
                    />
                    <Input
                        value={this.state.values.tag}
                        name="tag"
                        placeholder="Sensing unit tag"
                        onChange={this.onChange}
                    />
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

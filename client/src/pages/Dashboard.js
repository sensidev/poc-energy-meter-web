import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { Card } from '../components';
import { theme } from '../theme';
import { generateData } from '../helpers';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: generateData()
        };
    }

    componentDidMount() {
        setInterval(() => this.updateData(), 250);
    }

    updateData = () => {
        const data = generateData();
        this.setState({ data });
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <List>
                        {this.state.data.values.map(item => (
                            <Card
                                item={item}
                                timestamp={this.state.data.timestamp}
                                key={item.key}
                            />
                        ))}
                    </List>
                    <Contact>
                        <Logo>
                            <LogoText>Logo</LogoText>
                        </Logo>
                        <Site>sensix.io</Site>
                    </Contact>
                </Container>
            </ThemeProvider>
        );
    }
}

const Container = styled.div`
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.theme.linkWater};
`;

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-top: 2rem;
`;

const Contact = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1rem 0;
`;

const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 7.2rem;
    width: 7.2rem;
    border-radius: 50%;
    background-color: ${props => props.theme.white};
    margin-bottom: 1rem;
`;

const LogoText = styled.h3`
    margin: 0;
    color: ${props => props.theme.linkWater};
`;

const Site = styled.h3`
    margin: 0;
    color: ${props => props.theme.default};
`;

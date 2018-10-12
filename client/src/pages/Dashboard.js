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
        setInterval(() => this.updateData(), 5000);
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
                            <Card item={item} key={item.key} />
                        ))}
                    </List>
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
    height: 100%;
    background-color: ${props => props.theme.gallery};
`;

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 2.5%;
`;

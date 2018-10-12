import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Energy, Dashboard } from './pages';
import './theme/base.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/energy" component={Energy} />
                </React.Fragment>
            </Router>
        );
    }
}

export default App;

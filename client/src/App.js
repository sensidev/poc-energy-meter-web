import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Dashboard, Meter, Device } from './pages';
import './theme/base.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Route exact path="/" component={Device} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/energy" component={Meter} />
                </React.Fragment>
            </Router>
        );
    }
}

export default App;

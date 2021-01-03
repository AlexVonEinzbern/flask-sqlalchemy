import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { EliminarNota } from './components/EliminarNota';
import { EditarNota } from './components/EditarNota';
import { Principal } from './components/Principal';

function App() {
    return (
        <Router>
            <div>
                <Principal />
                <Switch>
                    <Route path="/EditarNota" component={EditarNota} />
                    <Route path="/EliminarNota" component={EliminarNota} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

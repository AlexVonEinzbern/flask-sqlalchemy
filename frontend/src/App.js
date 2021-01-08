import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import { Principal } from './components/Principal';

function App() {
    return (
        <Router>
            <div>
                <Principal />
            </div>
        </Router>
    );
}

export default App;

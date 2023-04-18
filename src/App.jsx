import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';

class App extends Component {
    render() {
        return (
            <div id="dashboard">
                <BrowserRouter>
                    <Layout />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
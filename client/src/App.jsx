import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';


function App() {
    return (
        <div id="dashboard">
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </div>
    );
}

export default App;
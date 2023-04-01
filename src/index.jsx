import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5500';
ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)

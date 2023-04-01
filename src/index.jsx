import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'


import axios from 'axios'
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)

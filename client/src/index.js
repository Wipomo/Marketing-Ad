import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom'
//import App from './App';
//import MonthlyAnnualElectricBill from './landing_page'
import App from "./Main";
import './css/index.css';

ReactDOM.render(
<BrowserRouter >
    <App/>
</BrowserRouter>, document.getElementById('root'));
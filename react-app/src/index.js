import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
//import MonthlyAnnualElectricBill from './landing_page'
import App from "./Main";
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
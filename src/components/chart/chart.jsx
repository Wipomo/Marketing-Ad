import React from 'react'
import {MakelloHighChart} from './landing_savings_chart.js'

export class Chart extends React.Component{
    constructor(props){
        super(props);
    
    }
    componentDidMount(){
        const {data, minimumYear, maximumYear} = this.props;
        const container = "chartContainer";
        this.chart = new MakelloHighChart(container, data, minimumYear , maximumYear);
    }
    render(){
        return(
            <div id="chartContainer">
            </div>
        )
    }
}
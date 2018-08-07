import React, { Component } from 'react';
import {Email, Slider, BillAmount, Button} from './components';

class MonthlyAnnualElectricBill extends Component
    {
        constructor(props){
            super(props);
            //this.state={valueChosen: 50, email:"", }

            // this.handleBtnClick = this.handleBtnClick.bind(this);
            // this.handleSliderChange = this.handleSliderChange.bind(this);
            // this.emailStateHandler = this.emailStateHandler.bind(this);
        }

        // handleSliderChange=(e)=>{
        //     this.setState({valueChosen: e.target.value});
        // }
        

        // emailStateHandler=(e)=>{
        //     console.log(e.target.value);
        //     //this.setState({email: e.target.value});
        // }


         render=()=>{	
            return (
                <div id="landingContainer">
                    {/* below div should have background photo */}
                    <div>
                        <h1> You dont need lots of panels to save money on solar.</h1>
                        <h2> See how much you can save.</h2>
                    </div>
                    
                    {/* below div should have a white background color */}
                    <div>
                        What's your monthly electric bill?

                        <div id ="sliderContainer">
                            <Slider min="50" max="5000" step="50" onInput={this.props.handleSliderChange}/>
                        </div>

                        {/* Billing Amount should eventually be replaced with sliderr component css */}
                        <BillAmount amount={this.props.monthlyBill} />

                        <div>
                            <Email value={this.props.email} onChange={this.props.emailStateHandler}/>
                        </div>
                        <div>
                            <Button onClick={this.props.handleBtnClick} disabled={this.props.disableLandingPageBtn}/>
                            {/* <Button disabled={this.props.givesEmailandMonthlyBill} onClick={this.props.handleBtnClick}/> */}

                        </div>
                    </div>
                </div>
            // React.createElement('div', {id: 'landingContainer'}, 
            // React.createElement('text', {},  "What's your monthly electric bill?"),
            // React.createElement('div', {id:'sliderContainer'},  React.createElement(Slider, {min:"50", max:"5000", step:"50", onInput: this.handleChange}, null)),
            // React.createElement('div', null,React.createElement(BillAmount, {amount: 50}, null)),
            // React.createElement('div', null, React.createElement(Email, {onInput: this.emailStateHandler}, null)),
            // React.createElement(Button, {showCostSavings: this.handleBtnClick}, null))
            );
         }
    }

    MonthlyAnnualElectricBill.propTypes={

    };

    MonthlyAnnualElectricBill.defaultProps={

    };

export default MonthlyAnnualElectricBill;
// ReactDOM.render(
//     React.createElement(MonthlyAnnualElectricBill, {})
//     ,document.getElementById('electricBillContainer'));
// }   
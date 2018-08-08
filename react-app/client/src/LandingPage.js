import React, { Component } from 'react';
import {Email, Slider, BillAmount, Button} from './components';
import { Link, Route, Redirect } from "react-router-dom";
import SavingsChartandCustomerData from "./TempLandingSavings";
import "./LandingPage.css";

class MonthlyAnnualElectricBill extends Component
    {
        // constructor(props){
        //     super(props);
        // }

         render=()=>{	
            return (
                <div id="landingContainer">
                    {/* below div should have background photo */}
                    <div class="div-with-bg">
                        <h1 class="savings-title"> You Don't Need Tons of Solar Panels to Save Money.</h1>
                        <h2 class="savings-subtitle"> See How Much You Can Save.</h2>
                    </div>
                    
                    {/* below div should have a white background color */}
                    <div id="landingBox">

                        <div id="monthlyText"><p>What's your monthly electric bill?</p></div>

                        <div id ="sliderContainer">
                            <div id="sliderContent">
                                <Slider min="50" max="5000" step="50" onInput={this.props.handleSliderChange}/>
                                {/* Billing Amount should eventually be replaced with slider component css */}
                                <BillAmount amount={this.props.monthlyBill} />
                            </div>
                        </div>

                        <div id="emailContainer">
                                <div id="emailContent">
                                    <Email value={this.props.email} onChange={this.props.emailStateHandler}/>
                                </div>
                                <div id="buttonContent">
                                    <Button onClick={this.props.handleBtnClick} disabled={this.props.disableLandingPageBtn}/>

                                    {/* <Link to="/savings">Savings/Form Page</Link> */}
                                
                                    
                                </div>
                            
                        </div>
                    </div>
                </div>
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
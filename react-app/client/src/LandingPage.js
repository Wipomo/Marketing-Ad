import React, { Component } from 'react';
import {Email, Slider, BillAmount, Button} from './components';
import { Link, Route, Redirect } from "react-router-dom";
import SavingsChartandCustomerData from "./TempLandingSavings";

class MonthlyAnnualElectricBill extends Component
    {
        // constructor(props){
        //     super(props);
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

                            {/* <Link to="/savings">Savings/Form Page</Link> */}
                            
                            {/* <Link to={{
                    pathname: './savings',
                    state: {
                        amount:this.props.monthlyBill, fullName:this.props.fullName, phone:this.props.phone,
                fullAddress:this.props.fullAddress, fullNameStateHandler:this.fullNameStateHandler, phoneStateHandler:this.phoneStateHandler,
                fullAddressStateHandler:this.fullAddressStateHandler, cityStateHandler:this.cityStateHandler, zipcodeStateHandler:this.zipcodeStateHandler,
                handleBtnClick:this.handleBtnClick, disableSavingsPageBtn:this.props.disableSavingsPageBtn
                    }

                }}>Click me</Link> */}
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
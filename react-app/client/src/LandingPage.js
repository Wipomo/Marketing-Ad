import React, { Component } from 'react';
import {Email, Slider, BillAmount, Button} from './components';
import { Link, Route, Redirect } from "react-router-dom";
import SavingsChartandCustomerData from "./TempLandingSavings";
import "./LandingPage.css";


class MonthlyAnnualElectricBill extends Component
    {
        // constructor(props){
        //     super(props);
        //     this.state= {amount: 100}
        // }
        // componentDidMount=()=>{
   
        //     var handleSli = this.props.location.state.amount;
        //     console.log("Component mounted !!! amount: " + amount);
        //   }
        handleBtnClick=()=>{
            // took out 2 backslashes to eliminate some uneccesary backlash errors**
            console.log("Comes in INNER page button");
            //window.location("./stuff");
            console.log("this.props.email: "+ this.props.email);
            console.log("reemail: "+ this.props.email);
            <Redirect to='/savings'/>
                if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.props.email)){
                    // store customer email and monthly bill in db,
                    //console.log("handle btn on email and monthly bill");
                    //this.setState({givesEmailandMonthlyBill: true});           
                    // check if input fits required standard
                    console.log("Everything set in INNER handler just gotta redirect to component page");
                    <Redirect to='/savings'/>
                    //console.log(history);
                    //console.log();
                    console.log("Should have redirected to new page by this time");    
                }
        }

         render=()=>{	

            const savings ={
                pathname: '/savings',
                state: {amount: 60}
                // , fullName:this.props.fullName, phone:this.props.phone, fullAddress:this.props.fullAddress,
                //     fullNameStateHandler:this.fullNameStateHandler, phoneStateHandler:this.phoneStateHandler,fullAddressStateHandler:this.fullAddressStateHandler,
                //     handleBtnClick:this.handleBtnClick, disableSavingsPageBtn:this.props.disableSavingsPageBtn
                // }
            }

            return (
                <div id="landingContainer">
                    {/* below div should have background photo */}
                    <div className="div-with-bg">
                        <div className="image"></div>
                        <div className="text">
                            <h1 className="savings-title"> You Don't Need Tons of Solar Panels to Save Money.</h1>
                            <h2 className="savings-subtitle"> See How Much You Can Save.</h2>
                        </div>
                        
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
                                    <Button onClick={this.handleBtnClick} disabled={this.props.disableLandingPageBtn}/>
                                </div>
                        </div>
                        <Link to={savings}>Savings/Form Page</Link>
                        
                        {/* <Redirect to={location}/> */}
                        {/* history.push(location)
                        history.replace(location) */}
                            
                        {/* browserHistory.push({pathname:'/savings', state: {message: "hello, im a passed message!"}}); */}


                

                        {/* <Route path="/savings" component={SavingsChartandCustomerData}/> */}
                        
                    
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
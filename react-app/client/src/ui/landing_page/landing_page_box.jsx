import React, { Component } from 'react';
import {Email, Slider, BillAmount, Button} from '../../components';
import { Link} from "react-router-dom";

const LandingPageBox = ({handleSliderChange, monthlyBill, email, emailStateHandler, disableLandingPageBtn}) =>{
    const savings ={
        pathname: '/savings',
        state: {amount: 60}
    }
    return(
        <div id="landingBox">

        <div id="monthlyText"><p>What's your monthly electric bill?</p></div>
        
        <div id ="sliderContainer">
            <div id="sliderContent">
                <Slider min="50" max="5000" step="50" onInput={handleSliderChange}/>
                {/* Billing Amount should eventually be replaced with slider component css */}
                <BillAmount amount={monthlyBill} />
            </div>
        </div>
        
        <div id="emailContainer">
                <div id="emailContent">
                    <Email value={email} onChange={emailStateHandler}/>
                </div>
                <div id="buttonContent">
                    <Button onClick={this.handleBtnClick} disabled={disableLandingPageBtn}/>
                </div>
        </div>
        <Link to={savings}>Savings/Form Page</Link>
        
        {/* <Redirect to={location}/> */}
        {/* history.push(location)
        history.replace(location) */}
            
        {/* browserHistory.push({pathname:'/savings', state: {message: "hello, im a passed message!"}}); */}
        
        
        
        
        {/* <Route path="/savings" component={SavingsChartandCustomerData}/> */}
        
        
        </div>
)}

export default LandingPageBox
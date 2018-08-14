import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import SavingsChartandCustomerData from "./TempLandingSavings";
import LandingPageTitle from "./ui/landing_page/landing_page_title"
import LandingPageBox from "./ui/landing_page/landing_page_box"
import "./LandingPage.css";


class MonthlyAnnualElectricBill extends Component
    {
        handleBtnClick=()=>{
            console.log("Comes in INNER page button");
            console.log("this.props.email: "+ this.props.email);
            console.log("reemail: "+ this.props.email);
            <Redirect to='/savings'/>
                if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.props.email)){
                    // store customer email and monthly bill in db,
                    // check if input fits required standard
                    console.log("Everything set in INNER handler just gotta redirect to component page");
                    <Redirect to='/savings'/>
                    console.log("Should have redirected to new page by this time");    
                }
        }

         render=()=>{	
            const {handleSliderChange, monthlyBill, email, emailStateHandler, disableLandingPageBtn} = this.props;

            return (
                <div id="landingContainer">
                    {/* below div should have background photo */}
                   <LandingPageTitle /> 
                    
                    {/* below div should have a white background color */}
                    <LandingPageBox handleSliderChange = {handleSliderChange} monthlyBill = {monthlyBill} email = {email} emailStateHandler = {emailStateHandler} disableLandingPageBtn = {disableLandingPageBtn}/> 
                </div>
            );
         }
    }

    MonthlyAnnualElectricBill.propTypes={

    };

    MonthlyAnnualElectricBill.defaultProps={

    };

export default MonthlyAnnualElectricBill;

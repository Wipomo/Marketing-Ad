// This page may need the Makello header and footer as well.
import React, {Component } from 'react';
import { Route, NavLink, HashRouter } from "react-router-dom";
import MonthlyAnnualElectricBill from "./LandingPage";
import SavingsChartandCustomerData from "./TempLandingSavings";
import EVPage from "./LandingEV";
import ThankYouRedirectPage from "./Redirect";
import "./Main.css";


class App extends Component{
    constructor(props){
        super(props);
        this.state={monthlyBill:50, email:"",
         gotEmail: false,
         givesEmailandMonthlyBill:false,
         givesNameandAddress:false,
         givesVehicleInfo: false,
         givesVehicleMilesandEVChoice:false,
         fullName:"", phone: "", streetAddress:"", city: "", zipcode:"",
         weeklyMileage:0, yearlyMileage:0, vehicleMake: "", vehicleModel:"",
         disableVehicleModel: true, disableVehicleYear: true, disableLandingPageBtn: true}

        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.emailStateHandler = this.emailStateHandler.bind(this);

        this.fullNameStateHandler = this.fullNameStateHandler.bind(this);
        this.phoneStateHandler = this.phoneStateHandler.bind(this);
        this.streetAddressStateHandler = this.streetAddressStateHandler.bind(this);
        this.zipcodeStateHandler = this.zipcodeStateHandler.bind(this);
        this.cityStateHandler = this.cityStateHandler.bind(this);

        this.weeklyMileageHandler = this.weeklyMileageHandler.bind(this);
        this.yearlyMileageHandler = this.yearlyMileageHandler.bind(this);
        this.vehicleMakeHandler = this.vehicleMakeHandler.bind(this);
        this.vehicleModelHandler = this.vehicleModelHandler.bind(this);

    }

    handleSliderChange=(e)=>{
        //console.log("Comes in here");
        this.setState({monthlyBill: e.target.value});
    }
    emailStateHandler=(e)=>{
        console.log(e.target.value);
        this.setState({email: e.target.value});
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)){
            // store customer email and monthly bill in db,
            console.log("passes email");
            this.setState({disableLandingPageBtn: false});
            
            // check if input fits required standard
        }
    }
    fullNameStateHandler=(e)=>{
        console.log("Fullname"+ e.target.value);
        this.setState({fullName: e.target.value});
    }
    phoneStateHandler=(e)=>{
        console.log("phone"+ e.target.value);
        this.setState({phone: e.target.value});
    }
    streetAddressStateHandler=(e)=>{
        console.log("street"+e.target.value);
        this.setState({streetAddress: e.target.value});
    }
    cityStateHandler=(e)=>{
        console.log("city" +e.target.value);
        this.setState({city: e.target.value});
    }
    zipcodeStateHandler=(e)=>{
        console.log("zip"+e.target.value);
        this.setState({zipcode: e.target.value});
    }
    weeklyMileageHandler=(e)=>{
        console.log(e.target.value);
        this.setState({weeklyMileage: e.target.value});
    }
    yearlyMileageHandler=(e)=>{
        console.log(e.target.value);
        this.setState({yearlyMileage: e.target.value});
    }
    vehicleMakeHandler=(e)=>{
        console.log("Chosen vehicle: "+ e.target.value);
        this.setState({vehicleMake: e.target.value})

        //also set vehicle model dropdown disabled to false
        this.setState({disableVehicleModel: false})
    }
    vehicleModelHandler=(e)=>{
        console.log("Chosen vehicle: "+ e.target.value);
        this.setState({vehicleModel: e.target.value})

        //also set vehicle model dropdown disabled to false
        this.setState({disableVehicleYear: false})
    }

    handleBtnClick=()=>{
        // took out 2 backslashes to eliminate some uneccesary backlash errors**
        //console.log("Comes in main page button");
        //window.location("./stuff");

        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)){
            // store customer email and monthly bill in db,
            console.log("passes email");
            this.setState({givesEmailandMonthlyBill: true});
            
            // check if input fits required standard
        }

        if((this.state.fullName !== "")  && (this.state.streetAddress !== "") && (this.state.city !== "") && (this.state.zipcode !== "")){
            // we would need to validate this with Google Maps**

            
            this.setState({givesNameandAddress: true});
            console.log("can set contact views to true");
        }



        // checks for entering all data info for vehicle
        if(true ){

        }
    }


    render(){

            const givesEmailandMonthlyBill = this.state.givesEmailandMonthlyBill;
            const givesNameandAddress = this.state.givesNameandAddress;
            const givesVehicleInfo = this.state.givesVehicleInfo;
            let view;
            //console.log("rerenders view on change: "+givesEmailandMonthlyBill+ " " + givesNameandAddress);

            // in the case where no input has been given
            if(!givesEmailandMonthlyBill && !givesNameandAddress && !givesVehicleInfo){
                view = <MonthlyAnnualElectricBill amount={this.state.monthlyBill} email={this.state.email} emailStateHandler={this.emailStateHandler}
                handleSliderChange={this.handleSliderChange} fullNameStateHandler={this.fullNameStateHandler} phoneStateHandler={this.fullNameStateHandler}
                monthlyBill={this.state.monthlyBill} handleBtnClick={this.handleBtnClick} disableLandingPageBtn = {this.state.disableLandingPageBtn}/>
                
            }
            else if(givesEmailandMonthlyBill && !givesNameandAddress && !givesVehicleInfo){
                // case where only email and monthly bill has been given
                console.log("gave email but not name and address yet");

                view = <SavingsChartandCustomerData amount={this.state.monthlyBill} fullName={this.state.fullName} phone={this.state.phone}
                streetAddress={this.state.streetAddress} city={this.state.city} zipcode={this.state.zipcode} fullNameStateHandler={this.fullNameStateHandler} phoneStateHandler={this.phoneStateHandler}
                streetAddressStateHandler={this.streetAddressStateHandler} cityStateHandler={this.cityStateHandler} zipcodeStateHandler={this.zipcodeStateHandler}
                handleBtnClick={this.handleBtnClick} givesNameandAddress={this.state.givesNameandAddress}/>
            }
            else if (givesEmailandMonthlyBill && givesNameandAddress && !givesVehicleInfo){
                // case where all info has been given besides ev info
                view=<EVPage weeklyMileage={this.state.weeklyMileage} yearlyMileage={this.state.yearlyMileage}
                 vehicleMakeHandler={this.vehicleMakeHandler} disableVehicleModel={this.state.disableVehicleModel}
                 weeklyMileageHandler={this.weeklyMileageHandler} yearlyMileage={this.yearlyMileageHandler}/>

            }
            else if (givesEmailandMonthlyBill && givesNameandAddress && givesVehicleInfo){
                view=<ThankYouRedirectPage/>
            }
            else{
                console.log("Should never come hear.. nothing to render")
            }

            // else{
            //     view=<EVPage vehicleMakeHandler={this.vehicleMakeHandler} disableVehicleModel={this.state.disableVehicleModel}/>

            // }
            

        return(
            // The HashRouter component provides
            // the foundation for the navigation and browser history handling
            // that routing is made up of.

            // We may want to use a BrowserRouter for dynamic back end server in comparison to
            // HashRouter that serves only static files
            <HashRouter>
            <div>
                <h1>Makello Header for SPAd</h1>
                {/* change page-list display to none/inline-block to hide/show controller*/}
                <ul className="header" style={{display:"none"}}>
                    <li><NavLink exact to="/landing">Landing/Bills Page</NavLink></li>
                    <li><NavLink to="/stuff">Savings/Form Page</NavLink></li>
                    <li><NavLink to="/contact">Electric Vehicles Page</NavLink></li>
                </ul>



                <div className="content">
                {/* we add the exact so its route does not match other routes */}
                <Route exact path="/landing" component={MonthlyAnnualElectricBill}/>
                <Route path="/stuff" component={SavingsChartandCustomerData}/>
                <Route path="/contact" component={EVPage}/>
                {/* <Route path='/page' render={(props) => (
                    <Page {...props} data={extraProps}/>) */}

                                
                {view}


                </div>

            </div>
            </HashRouter>
        );
    }
}

export default App;
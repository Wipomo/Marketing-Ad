// This page may need the Makello header and footer as well.
import React, {Component } from 'react';
import { Route, NavLink, HashRouter } from "react-router-dom";
import MonthlyAnnualElectricBill from "./LandingPage";
import SavingsChartandCustomerData from "./TempLandingSavings";
import EVPage from "./LandingEV";


class App extends Component{
    constructor(props){
        super(props);
        this.state={monthlyBill:50, email:"",
         GivesEmailandMonthlyBill:false,
         GivesNamePhoneandAddress:false,
         GivesVehicleMilesandEVChoice:false,
         fullName:"", phone: "", address:"",
         weeklyMileage:0, yearlyMileage:0, disableVehicleModel: true}
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.emailStateHandler = this.emailStateHandler.bind(this);
        this.weeklyMileageHandler = this.weeklyMileageHandler.bind(this);
        this.yearlyMileageHandler = this.yearlyMileageHandler.bind(this);
        this.vehicleMakeHandler = this.vehicleMakeHandler.bind(this);

    }

    handleSliderChange=(e)=>{
        //console.log("Comes in here");
        this.setState({monthlyBill: e.target.value});
    }
    emailStateHandler=(e)=>{
        console.log(e.target.value);
        this.setState({email: e.target.value});
    }
    fullNameStateHandler=(e)=>{
        console.log(e.target.value);
        this.setState({fullName: e.target.value});
    }
    phoneStateHandler=(e)=>{
        console.log(e.target.value);
        this.setState({phone: e.target.value});
    }
    addressStateHandler=(e)=>{
        console.log(e.target.value);
        this.setState({address: e.target.value});
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

    handleBtnClick=()=>{
        // took out 2 backslashes to eliminate some uneccesary backlash errors**
        //console.log("Comes in main page button");
        //window.location("./stuff");
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)){
            // store customer email and monthly bill in db,
            console.log("Comes in main page button");
            //<NavLink to="/stuff">Savings/Form Page</NavLink>

            //this.render(<Stuff/>);
            this.setState({GivesEmailandMonthlyBill: true});
            // check if input fits required standard
            if((this.state.fullName !== "")  && (this.state.phone!=="") && (this.state.address !== "")){
                this.setState({GivesNamePhoneandAddress: true});
                console.log("can set contact views to true");
            }

            // checks for entering all data info for vehicle
            if(true ){

            }
        }
    }


    render(){

            const GivesEmailandMonthlyBill = this.state.GivesEmailandMonthlyBill;
            const GivesNamePhoneandAddress = this.state.GivesNamePhoneandAddress;
            let view;

            if(!GivesEmailandMonthlyBill && !GivesNamePhoneandAddress){
                console.log("Comes in LAnding: "+!GivesEmailandMonthlyBill+ " " + !GivesNamePhoneandAddress);
                view = <MonthlyAnnualElectricBill amount={this.state.monthlyBill} email={this.state.email} emailStateHandler={this.emailStateHandler}
                handleSliderChange={this.handleSliderChange} monthlyBill={this.state.monthlyBill} handleBtnClick={this.handleBtnClick}/>
                
            }
            else if(GivesEmailandMonthlyBill && !GivesNamePhoneandAddress){
                console.log("comes in ");

                view = <SavingsChartandCustomerData amount={this.state.monthlyBill} fullName={this.state.fullName} phone={this.state.phone}
                address={this.state.address} fullNameStateHandler={this.fullNameStateHandler} phoneStateHandler={this.phoneStateHandler}
                addressStateHandler={this.addressStateHandler} handleBtnClick={this.handleBtnClick} GivesNamePhoneandAddress={this.GivesNamePhoneandAddress}/>
            }
            else if (GivesEmailandMonthlyBill && GivesNamePhoneandAddress){
                view=<EVPage vehicleMakeHandler={this.vehicleMakeHandler} disableVehicleModel={this.state.disableVehicleModel}/>

            }
            

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
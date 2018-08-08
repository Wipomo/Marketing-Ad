// This page may need the Makello header and footer as well.
import React, {Component } from 'react';
import { BrowserRouter, Link, Redirect, Route } from "react-router-dom";
import MonthlyAnnualElectricBill from "./LandingPage";
import SavingsChartandCustomerData from "./TempLandingSavings";
import EVPage from "./LandingEV";
import ThankYouRedirectPage from "./Redirect";
import "./Main.css";


class App extends Component{

    constructor(props){
        super(props);
        this.state={monthlyBill:50, email:"",
         givesEmailandMonthlyBill:false,
         givesNameandAddress:false,
         givesVehicleInfo: false,

         fullName:"", phone: "", streetAddress:"", city: "", zipcode:"",
         weeklyMileage:0, yearlyMileage:0, vehicleMake: "", vehicleModel:"",
         disableVehicleModel: true, disableVehicleYear: true, disableCustomerDataButton:true,
         disableLandingPageBtn: true, disableEVPageBtn: true, disableSavingsPageBtn: true}

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

    
      componentDidMount() {
        this.callApi()
          .then(res => this.setState({ response: res.express }))
          .catch(err => console.log(err));
      }
    
      callApi = async () => {
        const response = await fetch('/');
        const body = await response.json();
    
        if (response.status !== 200) throw Error(body.message);
    
        return body;
      };
      
    

    handleSliderChange=(e)=>{
        //console.log("Comes in here");
        this.setState({monthlyBill: e.target.value});
    }
    emailStateHandler=(e)=>{
        console.log(e.target.value);
        this.setState({email: e.target.value});
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)){
            // store customer email and monthly bill in db,
            console.log("passes email set disabled to false");
            this.setState({disableLandingPageBtn: false});
            
            // check if input fits required standard
        }
        else{
            this.setState({disableLandingPageBtn: true});

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

        if(e.target.value === ""){
            this.setState({})
        }
    }
    cityStateHandler=(e)=>{
        console.log("city" +e.target.value);
        this.setState({city: e.target.value});
        if(this.state.zipcode === ""){
            this.setState({disableSavingsPageBtn: true})
        }
    }
    zipcodeStateHandler=(e)=>{
        console.log("zip"+e.target.value);
        this.setState({zipcode: e.target.value});
        if(this.state.zipcode !== ""){
            this.setState({disableSavingsPageBtn: false})
        }
        else{
            this.setState({disableSavingsPageBtn: true})

        }
    }

    weeklyMileageHandler=(e)=>{
        console.log(e.target.value);
        this.setState({weeklyMileage: e.target.value});

        // confirm that all data has been entered
        if(e.target.value === ""){
            this.setState({disableEVPageBtn: true})
        }
        else if(this.state.vehicleMake!== ""){
            this.setState({disableEVPageBtn: false})
        }
    }
    yearlyMileageHandler=(e)=>{
        console.log(e.target.value);
        this.setState({yearlyMileage: e.target.value});

        // confirm that all data has been entered
        if(e.target.value === ""){
            this.setState({disableEVPageBtn: true})
        }
        else if(this.state.vehicleMake !== ""){
            this.setState({disableEVPageBtn: false})
        }


    }
    vehicleMakeHandler=(e)=>{
        console.log("Vehicle Make: "+ e.target.value);
        this.setState({vehicleMake: e.target.value})

        //also set vehicle model dropdown disabled to false
        this.setState({disableVehicleModel: false})

        // confirm that all data has been entered on savings page
        if(this.state.weeklyMileage  !== 0 || this.state.yearlyMileage!==0){
            this.setState({disableEVPageBtn: false})
        }

    }
    vehicleModelHandler=(e)=>{
        console.log("Vehicle Model: "+ e.target.value);
        this.setState({vehicleModel: e.target.value})

        //also set vehicle year dropdown disabled to false
        this.setState({disableVehicleYear: false})

    }

    handleBtnClick=()=>{
        // took out 2 backslashes to eliminate some uneccesary backlash errors**
        //console.log("Comes in main page button");
        //window.location("./stuff");

        if(!this.state.givesEmailandMonthlyBill){
            if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)){
                // store customer email and monthly bill in db,
                //console.log("handle btn on email and monthly bill");
                this.setState({givesEmailandMonthlyBill: true});           
                // check if input fits required standard
        
            }
        }
        else if(!this.state.givesNameandAddress){
            if((this.state.fullName !== "")  && (this.state.streetAddress !== "") && (this.state.city !== "") && (this.state.zipcode !== "")){
                // we would need to validate this with Google Maps**
                this.setState({givesNameandAddress: true});
                console.log("can set contact views to true");
        
            }
        }
        else if(!this.state.givesVehicleInfo){
            console.log("Tests vehicle Info");
            if(this.state.vehicleMake !== "" && (this.state.weeklyMileage !== 0 || this.state.yearlyMileage !== 0)){     
                this.setState({givesVehicleInfo:true});
            }
            else{
                console.log("FAILS TO SET VEHICLE INFO");
            }
        }   
    }


    render(){

            const givesEmailandMonthlyBill = this.state.givesEmailandMonthlyBill;
            const givesNameandAddress = this.state.givesNameandAddress;
            const givesVehicleInfo = this.state.givesVehicleInfo;
            let view;

            // in the case where no input has been given
            if(!givesEmailandMonthlyBill && !givesNameandAddress && !givesVehicleInfo){
                console.log("rerenders view on change: "+givesEmailandMonthlyBill+ " " + givesNameandAddress + " " + givesVehicleInfo);

                view = <MonthlyAnnualElectricBill amount={this.state.monthlyBill} email={this.state.email} emailStateHandler={this.emailStateHandler}
                handleSliderChange={this.handleSliderChange} fullNameStateHandler={this.fullNameStateHandler} phoneStateHandler={this.fullNameStateHandler}
                monthlyBill={this.state.monthlyBill} handleBtnClick={this.handleBtnClick} disableLandingPageBtn = {this.state.disableLandingPageBtn}/>
                
            }
            else if(givesEmailandMonthlyBill && !givesNameandAddress && !givesVehicleInfo){
                // case where only email and monthly bill has been given
                console.log("rerenders view on change: "+givesEmailandMonthlyBill+ " " + givesNameandAddress + " " + givesVehicleInfo);

                console.log("gave email but not name and address yet");
                <Redirect to='./savings'/>


                view = <SavingsChartandCustomerData amount={this.state.monthlyBill} fullName={this.state.fullName} phone={this.state.phone}
                streetAddress={this.state.streetAddress} city={this.state.city} zipcode={this.state.zipcode} fullNameStateHandler={this.fullNameStateHandler} phoneStateHandler={this.phoneStateHandler}
                streetAddressStateHandler={this.streetAddressStateHandler} cityStateHandler={this.cityStateHandler} zipcodeStateHandler={this.zipcodeStateHandler}
                handleBtnClick={this.handleBtnClick} disableSavingsPageBtn={this.state.disableSavingsPageBtn} />
            }
            else if (givesEmailandMonthlyBill && givesNameandAddress && !givesVehicleInfo){
                console.log("rerenders view on change: "+givesEmailandMonthlyBill+ " " + givesNameandAddress + " " + givesVehicleInfo);
                // case where all info has been given besides ev info
                view=<EVPage weeklyMileage={this.state.weeklyMileage} yearlyMileage={this.state.yearlyMileage}
                 vehicleMakeHandler={this.vehicleMakeHandler} vehicleModelHandler={this.state.vehicleModelHandler} disableVehicleModel={this.state.disableVehicleModel} disableEVPageBtn={this.state.disableEVPageBtn}
                 weeklyMileageHandler={this.weeklyMileageHandler} yearlyMileageHandler={this.yearlyMileageHandler} givesVehicleInfo={this.state.givesVehicleInfo} handleBtnClick={this.handleBtnClick}/>

            }
            else if (givesEmailandMonthlyBill && givesNameandAddress && givesVehicleInfo){
                console.log("rerenders view on change: "+givesEmailandMonthlyBill+ " " + givesNameandAddress + " " + givesVehicleInfo);
                view=<ThankYouRedirectPage />
            }
            else{
                console.log("Should never come hear.. nothing to render")
                view=<ThankYouRedirectPage />
            }

        return(
            // The HashRouter component provides
            // the foundation for the navigation and browser history handling
            // that routing is made up of.

            // We may want to use a BrowserRouter for dynamic back end server in comparison to
            // HashRouter that serves only static files
            <BrowserRouter>
            <div>
                <h1>Makello Header for SPAd</h1>
                {/* change page-list display to none/inline-block to hide/show controller*/}
                <ul className="header" style={{display:"none"}}>
                    <li><Link exact to="/">Landing/Bills Page</Link></li>
                    <li><Link to="/landing">Landing/Bills Page</Link></li>
                    <li><Link to="/savings">Savings/Form Page</Link></li>
                    <li><Link to="/ev">Electric Vehicles Page</Link></li>
                    <li><Link to="/thanks">Thank you Page</Link></li>
                </ul>

                {/* <Route path="/savings" component={SavingsChartandCustomerData} amount={this.props.monthlyBill} fullName={this.props.fullName} phone={this.props.phone}
                streetAddress={this.props.streetAddress} city={this.props.city} zipcode={this.props.zipcode} fullNameStateHandler={this.fullNameStateHandler} phoneStateHandler={this.phoneStateHandler}
                streetAddressStateHandler={this.streetAddressStateHandler} cityStateHandler={this.cityStateHandler} zipcodeStateHandler={this.zipcodeStateHandler}
                handleBtnClick={this.handleBtnClick} disableSavingsPageBtn={this.props.disableSavingsPageBtn}/> */}


                <div className="content">

                {/* we add the exact so its route does not match other routes */}
               
                                
                {view}

                </div>
                

            </div>
            
            </BrowserRouter>
        );
    }
}

export default App;
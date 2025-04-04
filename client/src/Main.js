// This page may need the Makello header and footer as well.
import React, {Component } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import MonthlyAnnualElectricBill from "./LandingPage";
import SavingsChartandCustomerData from "./LandingSavingsandCustomerInfo";
import EVPage from "./LandingEV";
import ThankYouRedirectPage from "./Redirect";
import "./css/Main.css";


const medianMonthlyBill = 2500;
class App extends Component{

    constructor(props){
        super(props);
        this.state={monthlyBill:medianMonthlyBill, email:'',
         givesEmailandMonthlyBill:false,
         givesNameandAddress:false,
         givesVehicleInfo: false,
         hasError: false, response: '',


         fullName:"", phone: "", fullAddress:"", city: "", zipcode:"",
         dailyMileage:"", milesPerGallon:"", vehicleMake: "", vehicleModel:"",
         disableVehicleModel: true, disableCustomerDataButton:true,
         disableLandingPageBtn: true, disableEVPageBtn: true, disableSavingsPageBtn: true}

        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.emailStateHandler = this.emailStateHandler.bind(this);

        this.fullNameStateHandler = this.fullNameStateHandler.bind(this);
        this.phoneStateHandler = this.phoneStateHandler.bind(this);
        this.fullAddressStateHandler = this.fullAddressStateHandler.bind(this);

        this.dailyMileageHandler = this.dailyMileageHandler.bind(this);
        this.milesPerGallonHandler = this.milesPerGallonHandler.bind(this);
        this.vehicleMakeHandler = this.vehicleMakeHandler.bind(this);
        this.vehicleModelHandler = this.vehicleModelHandler.bind(this);
    }

    
    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }
    

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        console.log("Found error in Main component did catch");
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
        // logComponentStackToMyService(info.componentStack);
    }
  
    callApi = async () => {
        const response = await fetch('/');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    handleSliderChange=(value)=>{
        console.log("Monthly Bill is: "+ value);
        this.setState({monthlyBill: value});
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

        if(e.target.value !== "" && this.state.fullAddress !== ""){
            this.setState({disableSavingsPageBtn: false})
        }
        else{
            this.setState({disableSavingsPageBtn: true})

        }

    }

    phoneStateHandler=(e)=>{
        console.log("phone"+ e.target.value);
        this.setState({phone: e.target.value});
    }

    fullAddressStateHandler=(e)=>{
        console.log("street "+e.target.value);
        this.setState({fullAddress: e.target.value});

        // verify google address
        if(e.target.value !== "" && this.state.fullName !== ""){
            this.setState({disableSavingsPageBtn: false})
        }
        else{
            this.setState({disableSavingsPageBtn: true})
        }
    }

    dailyMileageHandler=(e)=>{
        console.log(e.target.value);
        this.setState({dailyMileage: e.target.value});

        // confirm that all data has been entered
        if(!e.target.value){
            this.setState({disableEVPageBtn: true})
        }
        else if(this.state.vehicleMake!== ""){
            this.setState({disableEVPageBtn: false})
        }
    }

    milesPerGallonHandler=(e)=>{
        console.log(e.target.value);
        this.setState({milesPerGallon: e.target.value});

        // confirm that all data has been entered
        if(!e.target.value){
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
        if(this.state.dailyMileage  !== 0 || this.state.milesPerGallon!==0){
            this.setState({disableEVPageBtn: false})
        }

    }

    vehicleModelHandler=(e)=>{
        console.log("Vehicle Model: "+ e.target.value);
        this.setState({vehicleModel: e.target.value})
    }

    render(){

        return(
            // The HashRouter component provides
            // the foundation for the navigation and browser history handling
            // that routing is made up of.

            // We may want to use a BrowserRouter for dynamic back end server in comparison to
            // HashRouter that serves only static files
            <div>
                <h1>Makello Header for SPAd</h1>
                {/* change page-list display to none/inline-block to hide/show controller*/}
                <ul className="header" style={{display:"none"}}>
                    <li><Link to="/landing">Landing/Bills Page</Link></li>
                    <li><Link to="/savings">Savings/Form Page</Link></li>
                    <li><Link to="/ev">Electric Vehicles Page</Link></li>
                    <li><Link to="/thanks">Thank you Page</Link></li>
                </ul>

                <div className="content">
                    {/* <Link to={landing}> click to start </Link> */}
                    
                    {/* <Redirect to={landing}/> */}
                    {/* <Route path="/" component={MonthlyAnnualElectricBill}/> */}
                    <Switch>
                    <Route exact path="/" render={(props)=>(
                        <MonthlyAnnualElectricBill monthlyBill={this.state.monthlyBill} email={this.state.email} emailStateHandler={this.emailStateHandler} 
                         handleSliderChange={this.handleSliderChange}  disableLandingPageBtn={this.state.disableLandingPageBtn}/>  
                    )}/>

                    <Route path="/landing" render={(props)=>(
                        <MonthlyAnnualElectricBill monthlyBill={this.state.monthlyBill} email={this.state.email} emailStateHandler={this.emailStateHandler} 
                         handleSliderChange={this.handleSliderChange} disableLandingPageBtn={this.state.disableLandingPageBtn}/>  
                    )}/>

                    <Route path="/savings" render={(props)=>(
                        <SavingsChartandCustomerData amount={this.state.monthlyBill} fullName={this.state.fullName}
                        fullNameStateHandler={this.fullNameStateHandler} phone={this.state.phone} phoneStateHandler={this.phoneStateHandler}
                        fullAddress={this.state.fullAddress} fullAddressStateHandler={this.fullAddressStateHandler}
                        disableSavingsPageBtn= {this.state.disableSavingsPageBtn}/>  
                    )}/>

                    <Route path="/ev" render={(props)=>(
                        <EVPage dailyMileage={this.state.dailyMileage} milesPerGallon={this.state.milesPerGallon}
                        vehicleMakeHandler={this.vehicleMakeHandler} vehicleModelHandler={this.vehicleModelHandler} disableVehicleModel={this.state.disableVehicleModel} disableEVPageBtn={this.state.disableEVPageBtn}
                        dailyMileageHandler={this.dailyMileageHandler} milesPerGallonHandler={this.milesPerGallonHandler} givesVehicleInfo={this.state.givesVehicleInfo}/> 
                    )}/>

                    <Route path="/thanks" component={ThankYouRedirectPage}/>
                    </Switch>

                    {/* we add the exact so its route does not match other routes */}

                    {/* {view} */}
                    
                    {this.state.response}

                </div>
            </div>
            
        );
    }
}

export default App;
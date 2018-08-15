import React, { Component } from "react";
import { Button} from './components';
import { Link } from "react-router-dom";
import SavingsChart from "./landing_savings";
import "./LandingSavings.css";
import AddressInput from "./components/address_autocomplete"


var autocomplete=null;
var initAuto = false;
class SavingsChartandCustomerData extends Component {

  // constructor(props){
  //   super(props);
    
  // }

  //  componentDidMount=()=>{
     
  //  }

  initAutocomplete=()=>{

    console.log("Initializes autocomplete");

    // Create the autocomplete object, restricting the search to geographical
    // location types.
    var input = document.getElementById('autocomplete');
    autocomplete = new this.window.google.maps.places.Autocomplete(
        input,{types: ['address']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    this.window.google.maps.event.addListener('place_changed', this.fillInAddress);
  
  }

  fillInAddress=()=>{

    console.log("Update addy from autocomplete listener func");
    if(initAuto === false){
      var input = document.getElementById('autocomplete');
      // console.log(window.google.maps);
      // console.log(window.google.maps.places);
      autocomplete = new window.google.maps.places.Autocomplete(
        input,{types: ['address']});
        window.google.maps.event.addListener('place_changed', this.fillInAddress);
      initAuto = true;
    }else{
      console.log("Comes in here instead");
    }
    // // Get the place details from the autocomplete object.
     var place = autocomplete.getPlace();
     if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
     console.log(place.adrress_compoments);
  }

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  // ****mThis function is not being called due to hack to get autocomplete working
  geolocate=()=>{
    console.log("Comes into geolocate func");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new window.google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
         autocomplete.setBounds(circle.getBounds());
      });
    }
  }

  render() {
// console.log(this.props.location);
    return (
      <div id="s-landingContainer">
        <div>
          <SavingsChart monthlyBillingAmount={this.props.amount} />
          {/* <Chart data = {[]} minimumYear = {2010} maximumYear = {2015} /> */}
        </div>
        <div className="div-w-bg">
          <link href='https://fonts.googleapis.com/css?family=Montserrat:400,700&subset=latin,latin-ext' rel='stylesheet' type='text/css'/>

          {/* THIS div should have solar array bg image */}
          <div className="s-image"></div>
          <div className="s-text">
            <h1 className="s-title">Are You Ready to Save Money?</h1>
          </div>
        </div>
        <div id="s-landingBox">
          <div id="formContainer">
            <form>
              <h2> Get a custom energy report from Makello.</h2>
              <input name ="fullName" placeholder="Full Name*" onChange={this.props.fullNameStateHandler}></input><br/>
              <input name="phone" placeholder="Phone" onChange={this.props.phoneStateHandler}></input><br/>
              <AddressInput onChange={this.props.fullAddressStateHandler}/><br/>
              {/* <input id="autocomplete" name="fullAddress" className="controls" type="text" placeholder="Enter full address*"
                onFocus={this.fillInAddress} ></input><br/> */}
              <Button onClick={this.props.handleBtnClick} disabled={this.props.disableSavingsPageBtn}/>
              <li><Link to="/ev">Electric Vehicles Page</Link></li>
              {/* <Route path="/ev" component={EVPage}/> */}

            </form>
          </div>
          
        </div>
      </div>
    );
  }
}
 
export default SavingsChartandCustomerData;
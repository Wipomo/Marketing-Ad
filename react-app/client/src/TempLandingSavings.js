import React, { Component } from "react";
// import {Chart} from './components/chart/chart.jsx'
import { Button, BillAmount} from './components';
import { Link, Route } from "react-router-dom";
import SavingsChart from "./landing_savings";
import { userInfo } from "os";


//  var autocomplete = new window.google.maps.places.Autocomplete(
//   document.getElementById('autocomplete'),{types: ['address']});

var autocomplete=null;
var initAuto = false;

class SavingsChartandCustomerData extends Component {

  // constructor(props){
  //   super(props);
    
  // }

  // componentDidMount=()=>{
   
  //   var amount = this.props.location.state.amount;
  //   console.log("Component mounted !!! amount: " + amount);
  // }

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
      <div>
        <div>
          <SavingsChart monthlyBillingAmount={this.props.amount}/>
          {/* <Chart data = {[]} minimumYear = {2010} maximumYear = {2015} /> */}
          <BillAmount amount ={this.props.amount}/>
        </div>
        <div>
          {/* div should have solar array bg image */}
          <h1>Are you ready to save money ?</h1>
          <div>
            <form>
              <title> Get a custom energy report from Makello.</title>
              <input name ="fullName" placeholder="Full Name*" onChange={this.props.fullNameStateHandler}></input><br/>
              <input name="phone" placeholder="Phone" onChange={this.props.phoneStateHandler}></input><br/>
              <input id="autocomplete" name="fullAddress" className="controls" type="text" placeholder="Enter full address*"
                onFocus={this.fillInAddress} onChange={this.props.fullAddressStateHandler}></input><br/>
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
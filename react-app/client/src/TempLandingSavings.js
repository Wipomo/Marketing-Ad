import React, { Component } from "react";
import {Chart} from './components/chart/chart.jsx'
import { Button, BillAmount} from './components';
import { Link, Route } from "react-router-dom";
import EVPage from "./LandingEV"


 
class SavingsChartandCustomerData extends Component {

  // constructor(props){
  //   super(props);
  // }

  render() {
    return (
      <div>
        <div>
          <Chart data = {[]} minimumYear = {2010} maximumYear = {2015} />
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
              <input name="streetAddress" placeholder="Address*" onChange={this.props.streetAddressStateHandler}></input><br/>
              <input name="city" placeholder="City*" onChange={this.props.cityStateHandler}></input><br/>
              <select name="state" >
                <option defaultValue="CA"> CA </option>
                <option value="AK"> MX </option>
                <option value="AZ"> NV </option>
                <option value="AR"> OR </option>
                <option value="CA"> WA </option>
              </select>
              <input name="zipcode" placeholder="Zipcode*" onChange={this.props.zipcodeStateHandler}></input><br/>
              <Button onClick={this.props.handleBtnClick} disabled={this.props.disableSavingsPageBtn}/>
              {/* <li><Link to="/ev">Electric Vehicles Page</Link></li>
              <Route path="/ev" component={EVPage}/> */}
            </form>
          </div>
          
        </div>
      </div>
    );
  }
}
 
export default SavingsChartandCustomerData;
import React, { Component } from "react";
import {Chart} from './components/chart/chart.jsx'
import { Button, BillAmount} from './components';

 
class SavingsChartandCustomerData extends Component {

  constructor(props){
    super(props);
    //this.state={amount:props.amount }
    //this.handleBtnClick = this.handleBtnClick.bind(this);
    // this.handleSliderChange = this.handleSliderChange.bind(this);
    // this.emailStateHandler = this.emailStateHandler.bind(this);
  }

  // handleBtnClick=()=>{
  //   console.log("Comes in land savings button"); 
  //   // checks if form inputs are all filled,
  //   if(true){
  //     this.props.history.push("/contact");
  //   }
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
              <Button onClick={this.props.handleBtnClick} disabled={this.props.disableSavingsButton}/>
            </form>
          </div>
          
        </div>
      </div>
    );
  }
}
 
export default SavingsChartandCustomerData;
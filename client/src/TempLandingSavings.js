import React, { Component } from "react";
import { Button} from './components';
import { Link } from "react-router-dom";
import SavingsChart from "./landing_savings";
import "./LandingSavings.css";
import AddressInput from "./components/address_autocomplete"
import {Redirect} from "react-router-dom";




class SavingsChartandCustomerData extends Component {

  state = {
    toEVPage: false
  }

  handleBtnClick = () =>{
      this.setState({toEVPage: true});
  };

  render() {
    if (this.state.toEVPage){
      return <Redirect to='/ev' />
    }
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
              <Button onClick={this.handleBtnClick} disabled={this.props.disableSavingsPageBtn}/>


            </form>
          </div>
          
        </div>
      </div>
    );
  }
}
 
export default SavingsChartandCustomerData;
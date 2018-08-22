import React, { Component } from "react";
import { Button} from './components/components';
import { withRouter } from "react-router-dom";
import SavingsChart from "./components/landing_savings_page_top_section/landing_savings";
import "./css/landing_savings.css";
import AddressInput from "./components/address_autocomplete"






class SavingsChartandCustomerData extends Component {

  state = {
    toEVPage: false
  }

  handleBtnClick = () =>{
    this.setState({toEVPage: true});
    this.props.history.push('/ev');
  }


  render() {
    const {fullName, fullNameStateHandler, phone, phoneStateHandler, fullAddressStateHandler, fullAddress,
       disableSavingsPageBtn} = this.props;
    if (this.state.toEVPage){
      this.setState({toEVPage: false});
      // browserHistory.push('/ev');
      // this.context.router.push('/savings');
      // this.props.history.push('/ev')
      // return <Redirect from='/savings' to='/ev' />
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
              <input name ="fullName" value={fullName} placeholder="Full Name*" onChange={fullNameStateHandler}></input><br/>
              <input name="phone" value={phone} placeholder="Phone" onChange={phoneStateHandler}></input><br/>
              <AddressInput fullAddressStateHandler={fullAddressStateHandler} fullAddress={fullAddress}/><br/>
              {/* <input id="autocomplete" name="fullAddress" className="controls" type="text" placeholder="Enter full address*"
                onFocus={this.fillInAddress} ></input><br/> */}
              <Button onClick={this.handleBtnClick} disabled={disableSavingsPageBtn}/>


            </form>
          </div>
          
        </div>
      </div>
    );
  }
}
 
export default withRouter(SavingsChartandCustomerData);
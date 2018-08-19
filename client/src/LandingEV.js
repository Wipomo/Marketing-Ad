import React, { Component } from "react";
import EVForm from "./components/EVForm";
import { withRouter } from "react-router-dom";
import "./css/LandingEV.css";



class EVPage extends Component {
  state = {
    toThankYouPage: false
    }
  handleBtnClick = () =>{
    this.setState({toThankYouPage: true});
    this.props.history.push('/thanks');

};


  render() {
    if(this.state.toThankYouPage){
      this.setState({toThankYouPage: false});
    }

    return (
      // USe conditional rendering to detrmine weather to display ev form or not
      <div>

        <h2>Interested to see how much an electric car can increase savings?</h2>

        <EVForm vehicleMakeHandler = {this.props.vehicleMakeHandler} vehicleModelHandler={this.props.vehicleModelHandler}
        disableVehicleModel={this.props.disableVehicleModel}
        dailyMileage={this.props.dailyMileage} milesPerGallon={this.props.milesPerGallon}
        dailyMileageHandler={this.props.dailyMileageHandler} milesPerGallonHandler={this.props.milesPerGallonHandler}
        disableEVPageBtn={this.props.disableEVPageBtn} handleBtnClick={this.handleBtnClick}/> 
        
      </div>
    );
  }
}

export default withRouter(EVPage);
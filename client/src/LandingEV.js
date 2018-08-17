import React, { Component } from "react";
import EVForm from "./EVForm";
import { Link} from "react-router-dom";



class EVPage extends Component {
  render() {
    return (
      // USe conditional rendering to detrmine weather to display ev form or not
      <div>

        <h2>Interested to see how much an electric car can increase savings?</h2>

        <EVForm vehicleMakeHandler = {this.props.vehicleMakeHandler} vehicleModelHandler={this.props.vehicleModelHandler}
        disableVehicleModel={this.props.disableVehicleModel}
        dailyMileage={this.props.dailyMileage} milesPerGallon={this.props.milesPerGallon}
        dailyMileageHandler={this.props.dailyMileageHandler} milesPerGallonHandler={this.props.milesPerGallonHandler}
        disableEVPageBtn={this.props.disableEVPageBtn} handleBtnClick={this.props.handleBtnClick}/> 

      </div>
    );
  }
}

export default EVPage;
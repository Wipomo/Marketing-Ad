import React, { Component } from "react";
import EVForm from "./EVForm";


class EVPage extends Component {
  render() {
    return (
      // USe conditional rendering to detrmine weather to display ev form or not
      <div>
        <h2>Interested to see how much an electric car can increase savings?</h2>

        <EVForm vehicleMakeHandler = {this.props.vehicleMakeHandler} 
        disableVehicleModel={this.props.disableVehicleModel}
        weeklyMileage={this.props.weeklyMileage} yearlyMileage={this.props.yearlyMileage}
        weeklyMileageHandler={this.props.weeklyMileageHandler} yearlyMileage={this.props.yearlyMileageHandler}/>

      </div>
    );
  }
}

export default EVPage;
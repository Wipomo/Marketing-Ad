import React, { Component } from "react";
import EVForm from "./EVForm";


class EVPage extends Component {
  render() {
    return (
      // USe conditional rendering to detrmine weather to display ev form or not
      <div>
        <h2>Interested to see how much an electric car can increase savings?</h2>

        <EVForm vehicleMakeHandler = {this.props.vehicleMakeHandler} disableVehicleModel={this.props.disableVehicleModel}/>

        <p>
          Head to our website to learn more at <a href="https://wipomo-zoho-database.herokuapp.com/">Makello.com</a>.
        </p>
      </div>
    );
  }
}

export default EVPage;
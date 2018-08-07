import React from 'react';
import {Button} from './components';
import './EVForm.css';
// import './vehicleFormData/vehicleData.js';


class EVForm extends React.Component {

  render() {
    return(
        <form>
            <label>What is your weekly commute in miles?</label><br/>
            <input name="milesWeekly" onChange={this.props.weeklyMileageHandler}></input><br/>

            <div id ="different-alignment">
            <label>Vehicle Type</label><br/>
              <select id= "vehicleMake" name="vehicleMake" onChange={this.props.vehicleMakeHandler}>
                <option> Make </option>
                <option > Aston Martin </option>
                <option > Audi </option>
                <option > BMW </option>
                <option > BYD </option>
                <option > Byton </option>
                <option > Chevrolet </option>
                <option > Cadillac </option>
                <option > Chrysler </option>
                <option > Daimler </option>
                <option > Faraday Future </option>
                <option > Fiat </option>
                <option > Fisker/Karma </option>
                <option > Ford </option>
                <option > Honda </option>
                <option > Hyundai </option>
                <option > Infiniti </option>
                <option > Jaguar </option>
                <option > Kia </option>
                <option > Mazda </option>
                <option > Mercedes-Benz </option>
                <option > Mini </option>
                <option > Mitsubushi</option>
                <option > NIO </option>
                <option > Nissan </option>
                <option > Opel </option>
                <option > Peugeot/Citröen </option>
                <option > Porsche </option>
                <option > Renault </option>
                <option > Smart </option>
                <option > Subaru </option>
                <option > Tesla </option>
                <option > Toyota </option>
                <option > Volkswagen </option>
                <option > Volvo </option>
              </select><br/>
              <select id="vehicleModel" name="vehicleModel"  disabled={this.props.disableVehicleModel} onChange={this.props.vehicleModelHandler}>
                <option > Model </option>
              </select><br/>
              <select name="vehicleYear" disabled="true">
                <option > Year </option>
                <option > 2018 </option>
                <option > 2017 </option>
                <option > 2016 </option>
                <option > 2015 </option>
              </select><br/>
            </div>

              <label>How many miles do you drive per year?</label><br/>
            <input name="milesYearly" onChange={this.props.yearlyMileageHandler}></input><br/>
            <Button/>
        </form>
    )
  }
}
  

export default EVForm;
import React from 'react';
import {Button} from './components';
import '../css/EVForm.css';
import {Redirect, withRouter} from "react-router-dom";
// import './vehicleFormData/vehicleData.js';


class EVForm extends React.Component {
  // state = {
  //   toThankYouPage: false
  //   }

// handleBtnClick = () =>{
//     this.setState({toThankYouPage: true});
//     this.props.history.push('/thanks');

// };


  render() {
    // if(this.state.toThankYouPage){
    //   this.setState({toThankYouPage: false});
    // }

    return(
          
        <form>
            <label>What is your daily commute in miles?</label><br/>
            <input name="milesDaily" onChange={this.props.dailyMileageHandler} value={this.props.dailyMileage}></input><br/>
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
              <select id="vehicleModel" name="vehicleModel" onChange={this.props.vehicleModelHandler} disabled={this.props.disableVehicleModel}>
              <option > Model </option>
                <option > Model 1</option>
                <option > Model 2</option>
                <option > Model 3</option>
                <option > Model 4</option>
              </select><br/>
            </div>

              <label>What is your vehicles miles per gallon ?</label><br/>
            <input name="milesPerGallon" value={this.props.milesPerGallon} onChange={this.props.milesPerGallonHandler}></input><br/>
            <Button onClick={this.props.handleBtnClick} disabled={this.props.disableEVPageBtn} />
        </form>

    )
  }
}
  

export default withRouter(EVForm);
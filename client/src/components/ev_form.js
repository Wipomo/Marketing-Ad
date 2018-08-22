import React from 'react';
import {Button} from './components';
import '../css/ev_form.css';
import { withRouter} from "react-router-dom";
import {vehicle} from "../vehicle_form_data/vehicle_model";

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
              {Object.keys(vehicle).map( vehicleMake => {
                return <option>{vehicleMake}</option>
               } )
            }
               
              </select><br/>
              <select id="vehicleModel" name="vehicleModel" onChange={this.props.vehicleModelHandler} disabled={this.props.disableVehicleModel}>
              {  
                (this.props.vehicleMake) ?
                 vehicle[this.props.vehicleMake].map(vehicleModel=>{
                  return <option> {vehicleModel} </option> 
                  }) : null
              }
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
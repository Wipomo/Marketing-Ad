import React, {Component} from 'react';

var autocomplete=null;
var initAuto = false;
class AddressInput extends Component{

    initAutocomplete=()=>{

        console.log("Initializes autocomplete");
    
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        var input = document.getElementById('autocomplete');
        autocomplete = new this.window.google.maps.places.Autocomplete(
            input,{types: ['address']});
    
        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        this.window.google.maps.event.addListener('place_changed', this.fillInAddress);
      
      }
    
      fillInAddress=()=>{
    
        console.log("Update addy from autocomplete listener func");
        if(initAuto === false){
          var input = document.getElementById('autocomplete');
          // console.log(window.google.maps);
          // console.log(window.google.maps.places);
          autocomplete = new window.google.maps.places.Autocomplete(
            input,{types: ['address']});
            window.google.maps.event.addListener('place_changed', this.fillInAddress);
          initAuto = true;
        }else{
          console.log("Comes in here instead");
        }
        // // Get the place details from the autocomplete object.
         var place = autocomplete.getPlace();
         if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }
         console.log(place.adrress_compoments);
      }
    
      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      // ****mThis function is not being called due to hack to get autocomplete working
      geolocate=()=>{
        console.log("Comes into geolocate func");
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new window.google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
             autocomplete.setBounds(circle.getBounds());
          });
        }
      }

    render(){
    return <input placeholder="Enter full address*" value={this.props.fullAddress} onChange={this.props.fullAddressStateHandler}/>
    }
   
}
export default AddressInput;
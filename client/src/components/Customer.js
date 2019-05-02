var Customer={

    givesEmailandMonthlyBill:false,
    givesNameandAddress:false,
    givesVehicleInfo:false,
    fullName:"",phone: "", fullAddress:"", email:"",
    dailyMileage:"", milesPerGallon:"", vehicleMake: "", vehicleModel:"",

    // emailStateHandler: function(email){
    //     console.log("gets in customer email handler");
    //     this.email = email;
    // }


}

Customer.emailStateHandler = function(email){
    console.log("gets in customer email handler");
    this.email = email;
}



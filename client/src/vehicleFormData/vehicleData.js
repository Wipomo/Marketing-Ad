const $ = window.$;

$(document).ready(function(){
	$("#vehicleMake").click(function() {
		console.log("Comes in jquery change funcrtion");
		var $dropdown = $(this);

		$.getJSON("vehicleModel.json", function(data) {
		
			var key = $dropdown.val();
			var vals = [];
								
			switch(key) {
				case 'Audi':
					vals = data.Audi.split(",");
					break;
				case 'BMW':
					vals = data.BMW.split(",");
					break;
			}
			
			// add models
			var $vehicleModel = $("#second-choice");
			$vehicleModel.empty();
			$.each(vals, function(index, value) {
				$vehicleModel.append("<option>" + value + "</option>");
			});

			// add years


		});
	});
})
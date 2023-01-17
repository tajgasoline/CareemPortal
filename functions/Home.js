

var PetrolPrice = 0;
var DieselPrice = 0;
var Discount = 0;

var Captians = [];
var CarCaptians = [];
var BikeCaptians = [];
var RickshawCaptians = [];
var PickupCaptians = [];



$(document).ready(function()
{

	getData();
    //dropdown select
	$(".Search").select2({ 
	});

});


function filterproductprice(value){
	
	if(value == '1'){


		$("#ProductPrice").val(PetrolPrice);
		$("#Discount").val(Discount);

	}
	else if (value == '2'){

		$("#ProductPrice").val(DieselPrice);
		$("#Discount").val(Discount);		
	}
	

}



function getData(){

	var check = 'Yes';
	completedata = $.ajax({
		url: "api/getData.php",

		method: "POST",
		data: {
			check : check
		},

		dataType: "JSON",

		success: function (data) 
		{ 
			
			
			// SetValues1( Discount);
			
			// $("#ProductPrice").val(price);
			// $("#Discount").val(discount);
			

			return data;

		}
	}).done(function(data)        
	{ 

		Captians = data.CaptainData; 
		sorting();
		

		PetrolPrice = data.dbPetrolPrice
		DieselPrice = data.dbDieselPrice;
		Discount = data.dbDiscount; 
		

	});

}







function BtnLoadingTrue(){            
	$("#btnlogin").attr("disabled", true);
	$('#btnlogin').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...');
	
}


function BtnLoadingFalse(){            

	$("#btnlogin").attr("disabled", false);

	$('#btnlogin').html('Registered <i class="fas fa-sign-in-alt ml-1"></i>');

}



function calc1(){
	
	var price = $("#Liters").val();
	var discount = $("#Discount").val();
	var discountamount = price * discount;
	$("#DiscountAmount").val(discountamount);
	var ProductPrice = $("#ProductPrice").val();
	var totalamount = ProductPrice*price;
	$("#Amount").val(totalamount-discountamount);


}


function calc2(){
	$("#Liters").val(0); 
	$("#DiscountAmount").val(0); 
	$("#Amount").val(0);


}


function submit(){


	var CustomerName = $("#CustomerName").val();
	var VehicleType = $("#VehicleType").val();
	var VehicleNumber = $("#VehicleNumber").val();
	var Product = $("#Product").val();
	var Liters = $("#Liters").val();
	var DiscountAmount = $("#DiscountAmount").val();
	var Amount = $("#Amount").val();
	var ProductPrice = $("#ProductPrice").val();
	var ContactNumber = $("#ContactNumber").val();
	var Discount = $("#Discount").val();

	$("#vv1").css("display", "none");
	$("#VehicleNumber").css("border-color", "");
	$("#vv2").css("display", "none");
	$("#Product").css("border-color", "");
	$("#vv3").css("display", "none");
	$("#Liters").css("border-color", "");

	if(VehicleNumber == "" || VehicleNumber == null){

		$("#vv1").css("display", "block");
		$("#vv1").text("Please Fill This.");
		$("#VehicleNumber").css("border-color", "red");
		$("#VehicleNumber").focus();
	}else if(Product == "" || Product == null){

		$("#vv2").css("display", "block");
		$("#vv2").text("Please Fill This.");
		$("#Product").css("border-color", "red");
		$("#Product").focus();
	} else if(Liters == "" || Liters == null || Liters == 0){

		$("#vv3").css("display", "block");
		$("#vv3").text("Please Fill This.");
		$("#Liters").css("border-color", "red");
		$("#Liters").focus();
	}else{
		$.ajax({
			url: "api/submission.php",

			method: "POST",
			data: {
				CustomerName : CustomerName,
				VehicleType : VehicleType,
				VehicleNumber : VehicleNumber,
				Product : Product,
				Liters : Liters,
				DiscountAmount : DiscountAmount,
				ProductPrice:ProductPrice,
				Amount : Amount,
				ContactNumber:ContactNumber,
				Discount:Discount
			},

			dataType: "JSON",
			beforeSend: function(){
				BtnLoadingTrue();
			},
			success: function (data) 
			{ 
				BtnLoadingFalse();
				var result = data.result;
				var id = data.id;
				


				if ( result == "Inserted")
				{
					$("#btnprint").prop("disabled",false);
				 // window.print();
					
					$("#printid").val(id);

					Swal.fire({
						title: "Transaction Performed Successfully!",
						text: "Click Print if you want Printed Bill",
						type: "success",
						showCancelButton: false,
						confirmButtonColor: "#3085d6",
						cancelButtonColor: "#d33"
					})
				}    
				return data;

			}
		});




	}
	


	

}

function Printinvoice(){
	var id = $("#printid").val();
	var url = 'invoice.php?id='+id;
	window.open(url,'_blank');
	// window.location.href = 'invoice.php?id='+id;
}



function reload(){
	location.reload();

}

function resetall(){
	
	$("#VehicleNumber").val('');
	$("#CustomerName").val('');
	$("#ContactNumber").val('');
	$("#captainid").val('');
	$("#vehicleid").val('');

	
$("#VehicleType").val('null');
	$("#Search").val('reset');
	     $('#Search').select2().trigger('change'); 
 
	


	$("#Product").val('null');
	$("#ProductPrice").val('');
	$("#Liters").val('');
	$("#Discount").val('');
	$("#DiscountAmount").val('');
	$("#Amount").val('');

	






}

function sorting(){ 



	//This sorting is for Car
	var Carindex=0;
	for (var i =0; i < Captians.length ; i++) {

		if(Captians[i].vehicletype == 'Car'){ 
 			// console.log(CarCaptians[Carindex].vehicletype);
			CarCaptians[Carindex] = Captians[i];
			Carindex++;
		}
	}


		//This sorting is for Bike
	var Bikeindex=0;
	for (var i =0; i < Captians.length ; i++) {

		if(Captians[i].vehicletype == 'Bike' ){ 

			BikeCaptians[Bikeindex] = Captians[i];
			Bikeindex++;
		}
	}


		//This sorting is for Pickup
	var Pickupindex=0;
	for (var i =0; i < Captians.length ; i++) {
		
		if(Captians[i].vehicletype == 'Pickup' ){ 

			PickupCaptians[Pickupindex] = Captians[i];
			Pickupindex++;
		}
	}


		//This sorting is for Rickshaw
	var Rickshawindex=0;
	for (var i =0; i < Captians.length ; i++) {
		
		if(Captians[i].vehicletype == 'Rickshaw' ){ 

			RickshawCaptians[Rickshawindex] = Captians[i];
			Rickshawindex++;
		}
	}



}

function getCustomers(){

	var VehicleType = $("#VehicleType").val();


	$("#Search").html('');

	if(VehicleType == 'Car'){ 

		var options = "<option value='reset' selected disabled>Select Car Number</option>";
		for (var i =0; i < CarCaptians.length ; i++) {
			if(CarCaptians[i].vehicletype == VehicleType ){ 
				options +=  "<option data-captainid='" + CarCaptians[i].captainid + "'"
				+" data-vehicleid='" + CarCaptians[i].vehicleid +"' "
				+ "data-vehiclenumber='" + CarCaptians[i].vehiclenumber +"' " 
				+"data-customername='" + CarCaptians[i].customername +"'"
				+"data-contactnumber='" + CarCaptians[i].contactnumber +"'" 
				+" value='" + CarCaptians[i].vehiclenumber +"'>" + CarCaptians[i].vehiclenumber +" - " + CarCaptians[i].customername +" - " + CarCaptians[i].contactnumber +"</option>"; 
			}

		}

	} else if(VehicleType == 'Bike'){ 
		var options = "<option value='reset' selected disabled>Select Bike Number</option>";
		for (var i =0; i < BikeCaptians.length ; i++) {
			if(BikeCaptians[i].vehicletype == VehicleType ){ 
				options +=  "<option data-captainid='" + BikeCaptians[i].captainid + "'"
				+" data-vehicleid='" + BikeCaptians[i].vehicleid +"' "
				+ "data-vehiclenumber='" + BikeCaptians[i].vehiclenumber +"' " 
				+"data-customername='" + BikeCaptians[i].customername +"'"
				+"data-contactnumber='" + BikeCaptians[i].contactnumber +"'" 
				+" value='" + BikeCaptians[i].vehiclenumber +"'>" + BikeCaptians[i].vehiclenumber +" - " + BikeCaptians[i].customername +" - " + BikeCaptians[i].contactnumber +"</option>"; 
			}

		}

	} else if(VehicleType == 'Rickshaw'){ 
		var options = "<option value='reset' selected disabled>Select Rickshaw Number</option>";
		for (var i =0; i < RickshawCaptians.length ; i++) {
			if(RickshawCaptians[i].vehicletype == VehicleType ){ 
				options +=  "<option data-captainid='" + RickshawCaptians[i].captainid + "'"
				+" data-vehicleid='" + RickshawCaptians[i].vehicleid +"' "
				+ "data-vehiclenumber='" + RickshawCaptians[i].vehiclenumber +"' " 
				+"data-customername='" + RickshawCaptians[i].customername +"'"
				+"data-contactnumber='" + RickshawCaptians[i].contactnumber +"'" 
				+" value='" + RickshawCaptians[i].vehiclenumber +"'>" + RickshawCaptians[i].vehiclenumber +" - " + RickshawCaptians[i].customername +" - " + RickshawCaptians[i].contactnumber +"</option>"; 
			}

		}

	} else if(VehicleType == 'Pickup'){ 
		var options = "<option value='reset' selected disabled>Select Pickup Number</option>";
		for (var i =0; i < PickupCaptians.length ; i++) {
			if(PickupCaptians[i].vehicletype == VehicleType ){ 
				options +=  "<option data-captainid='" + PickupCaptians[i].captainid + "'"
				+" data-vehicleid='" + PickupCaptians[i].vehicleid +"' "
				+ "data-vehiclenumber='" + PickupCaptians[i].vehiclenumber +"' " 
				+"data-customername='" + PickupCaptians[i].customername +"'"
				+"data-contactnumber='" + PickupCaptians[i].contactnumber +"'" 
				+" value='" + PickupCaptians[i].vehiclenumber +"'>" + PickupCaptians[i].vehiclenumber +" - " + PickupCaptians[i].customername +" - " + PickupCaptians[i].contactnumber +"</option>"; 
			}
		}


	}
	else{
		alert('Oops! Some Error Occured!');
	}


	$("#Search").html(options);


	// $.ajax({
	// 	url: "api/getCustomers.php",

	// 	method: "POST",
	// 	data: {
	// 		VehicleType : VehicleType
	// 	},

	// 	dataType: "JSON",

	// 	success: function (data) 
	// 	{ 

	// 		var options = data.options;
	// 		$("#Search").html(options);

	// 		return data;

	// 	}
	// });
}


function settingCustomerValues(){
	

	var  vehiclenumber = $('#Search').find(':selected').data('vehiclenumber');
	var  customername = $('#Search').find(':selected').data('customername');
	var  contactnumber = $('#Search').find(':selected').data('contactnumber');
	var  captainid = $('#Search').find(':selected').data('captainid');
	var  vehicleid = $('#Search').find(':selected').data('vehicleid');

	$("#VehicleNumber").val(vehiclenumber);
	$("#CustomerName").val(customername);
	$("#ContactNumber").val(contactnumber);
	$("#captainid").val(captainid);
	$("#vehicleid").val(vehicleid);

	
}



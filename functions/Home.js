
function BtnLoadingTrue(){            
    $("#btnlogin").attr("disabled", true);
    $('#btnlogin').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...');
    
}


function BtnLoadingFalse(){            

    $("#btnlogin").attr("disabled", false);

    $('#btnlogin').html('Registered <i class="fas fa-sign-in-alt ml-1"></i>');

}

function filterproductprice(value){

	var price = value;
	$.ajax({
		url: "api/filterproductprice.php",

		method: "POST",
		data: {
			price : price
		},

		dataType: "JSON",

		success: function (data) 
		{ 

			var price = data.price;
			var discount = data.discount;
			$("#ProductPrice").val(price);
			$("#Discount").val(discount);
			

			return data;

		}
	});
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
	window.location.href = 'invoice.php?id='+id;
}

function reload(){
		location.reload();
}


function getCustomers(){

	var VehicleType = $("#VehicleType").val();
	$.ajax({
		url: "api/getCustomers.php",

		method: "POST",
		data: {
			VehicleType : VehicleType
		},

		dataType: "JSON",

		success: function (data) 
		{ 

			var options = data.options;
			$("#Search").html(options);

			return data;

		}
	});
}


function settingCustomerValues(){
 
var  vehiclenumber = $('#Search').find(':selected').data('vehiclenumber');
var  customername = $('#Search').find(':selected').data('customername');
var  contactnumber = $('#Search').find(':selected').data('contactnumber');

$("#VehicleNumber").val(vehiclenumber);
$("#CustomerName").val(customername);
$("#ContactNumber").val(contactnumber);



 
}



$(document).ready(function()
{
 

    //dropdown select
      $(".Search").select2({
        // dropdownParent:$("#carrierparent")
      });


});

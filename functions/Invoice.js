//getting id from url
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
  sURLVariables = sPageURL.split('&'),
  sParameterName,
  i;
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
};



function settingvalues(){
  var id = getUrlParameter('id');
 


  $.ajax( {
    url: "api/invoicedetails.php",
    method: "POST",
    data: {id:id},
    dataType: "JSON",
    success: function (data) 
    {
     var id = data.id; 
     var customername = data.customername; 
     var VEHICLETYPE = data.VEHICLETYPE; 
     var vehiclenumber = data.vehiclenumber; 
     var product = data.product; 
      var price = data.price; 
     var quantity = data.quantity; 
     var amount = data.amount; 
     var site = data.site; 

      var discount = data.discount; 
     var contactnumber = data.contactnumber; 
     var discountamount = data.discountamount; 
     var doc = data.doc;   
 

 $("#discount").html(discount);
      $("#contactnumber").html(contactnumber);
    $("#discountamount").html(discountamount);
    $("#doc").html(doc); 


    $("#site").html(site);
    $("#customername").html(customername);
    $("#VEHICLETYPE").html(VEHICLETYPE);
    $("#vehiclenumber").html(vehiclenumber);
    $("#product").html(product);
      $("#price").html(price);
    $("#quantity").html(quantity);
    $("#amount").html(amount); 




    




    
window.print();




    return data;
  }
});

}


$(document).ready(function()
{

  settingvalues();

});


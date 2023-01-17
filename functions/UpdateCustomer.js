 function BtnLoadingTrue(){            
    $("#btnSearch").attr("disabled", true);
    $('#btnSearch').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...');
}
function BtnLoadingFalse(){            
    $("#btnSearch").attr("disabled", false);
    $('#btnSearch').html('Search <i class="fas fa-sign-in-alt ml-1"></i>');
}

$(document).ready(function()
{
});

function Searching(){


    var Search = $('#Search').val();
    if(Search == '' || Search == null){
        alert('please type something here');
        $('#Search').focus();
    }else {
        $.ajax({
            url: "api/getCaptain2.php",
            method: "POST",
            data: {
                Search : Search
            },
            dataType: "JSON",
             beforeSend: function(){
           BtnLoadingTrue();
       },
            success: function (data) 
            { 
                   BtnLoadingFalse();

                        $("#ID1").val(data.id);
       $("#VehicleID1").val(data.vehicleid);
       $("#VEHICLETYPE1").val(data.vehicletype);
       $("#VEHICLENUMBER1").val(data.vehiclenumber);
       $("#CaptainID1").val(data.captainid);
       $("#CUSTOMERNAME1").val(data.customername);
       $("#CONTACTNUMBER1").val(data.contactnumber);
       $("#Status1").val(data.status); 


                // $("#VehicleNumber").val(data.vehiclenumber);
                // $("#CustomerName").val(data.customername);
                // $("#ContactNumber").val(data.contactnumber);
                // $("#captainid").val(data.captainid);
                // $("#vehicleid").val(data.vehicleid);
                // $("#VehicleType").val(data.vehicletype);
                // $('#VehicleType').select2().trigger('change'); 


                return data;
            }
        });
    }
}


function AddAllUsers(){

 var ID1 = $("#ID").val(); 
 var VehicleID1 = $("#VehicleID").val(); 
 var VEHICLETYPE1 = $("#VEHICLETYPE").val(); 
 var VEHICLENUMBER1 = $("#VEHICLENUMBER").val(); 
 var CaptainID1 = $("#CaptainID").val(); 
 var CUSTOMERNAME1 = $("#CUSTOMERNAME").val();
 var CONTACTNUMBER1 = $("#CONTACTNUMBER").val();
 var Status1 = $("#Status").val();
 


 Swal.fire({
  title: "Are you sure?",
  text: "You want to add New Customer!",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes!"
}).then((result) => {
  if (result.value) {  
    $.ajax( {
        url: "api/AddCustomer.php",
        method: "POST",
        data: { 
            VehicleID1:VehicleID1,
            VEHICLETYPE1:VEHICLETYPE1,
            VEHICLENUMBER1:VEHICLENUMBER1,
            CaptainID1:CaptainID1,
            CUSTOMERNAME1:CUSTOMERNAME1,
            CONTACTNUMBER1:CONTACTNUMBER1,
            Status1:Status1


        },
        dataType: "JSON",
        success: function (data) 
        {
            var result = data.result;
            if ( result == "Inserted" )
            {
               Swal.fire({
                title: "Customer Added Successfully!",
                type: "success",
                timer: 4000,
                showConfirmButton: true,
            }) 


               $("#btncancel").trigger("click");
               $("#datatable").DataTable().destroy(); 
               tblAllUsers();
           } 
           else 
           { 
            Swal.fire({
                title: "Opps! Some Error Occured!",
                type: "error",
                text: "Please login first",
                timer: 4000,
                showConfirmButton: true,
            }).then(function () {
                window.location.href = "index.php";
            });
        }
        return data;
    }
});

} })


}




function UpdateAllUsers() {

    var ID1 = $("#ID1").val(); 
    var VehicleID1 = $("#VehicleID1").val(); 
    var VEHICLETYPE1 = $("#VEHICLETYPE1").val(); 
    var VEHICLENUMBER1 = $("#VEHICLENUMBER1").val(); 
    var CaptainID1 = $("#CaptainID1").val(); 
    var CUSTOMERNAME1 = $("#CUSTOMERNAME1").val();
    var CONTACTNUMBER1 = $("#CONTACTNUMBER1").val();
    var Status1 = $("#Status1").val();


    Swal.fire({
      title: "Are you sure?",
      text: "You want to update this Customer!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
  }).then((result) => {
      if (result.value) {  
        $.ajax( {
            url: "api/UpdateCustomers.php",
            method: "POST",
            data: {
                ID1:ID1,
                VehicleID1:VehicleID1,
                VEHICLETYPE1:VEHICLETYPE1,
                VEHICLENUMBER1:VEHICLENUMBER1,
                CaptainID1:CaptainID1,
                CUSTOMERNAME1:CUSTOMERNAME1,
                CONTACTNUMBER1:CONTACTNUMBER1,
                Status1:Status1
            },
            dataType: "JSON",
            success: function (data) 
            {
                var result = data.result; 
                if ( result == "Done" )
                { 
                  Swal.fire({
                    title: "Customer Updated Successfully!",
                    type: "success",
                    timer: 4000,
                    showConfirmButton: true,
                }) .then(function () {
                    window.location.href = "UpdateCustomer.php";
                });

                  // $("#btncancel1").trigger("click");
                  // $("#datatable").DataTable().destroy(); 
                  // tblAllUsers();

              } 
              else 
              { 
                Swal.fire({
                    title: "Opps! Some Error Occured!",
                    type: "error",
                    text: "Please login first",
                    timer: 4000,
                    showConfirmButton: true,
                }).then(function () {
                    window.location.href = "Home.php";
                });
            }
            return data;
        }
    });
    } })

}





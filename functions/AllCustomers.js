

function tblAllUsers(){

 $("#datatable").DataTable({
    "ajax": "api/TblAllCustomers.php",
    "columns": [
       { "data": "Empty"},
       { "data": "id"} ,
       { "data": "VehicleID"}  ,
       { "data": "VEHICLETYPE"} ,
       { "data": "VEHICLENUMBER"},
       { "data": "CaptainID"},   
       { "data": "CUSTOMERNAME"},
       { "data": "CONTACTNUMBER"} , 
         { "data": "STATUS"} ,

       ],
});

}


$(document).ready(function()
{

   tblAllUsers(); 

   $(document).on("click", ".edit-modal", function(){




       $("#ID1").val($(this).attr("id"));
       $("#VehicleID1").val($(this).data("vehicleid"));
       $("#VEHICLETYPE1").val($(this).data("vehicletype"));
       $("#VEHICLENUMBER1").val($(this).data("vehiclenumber"));
       $("#CaptainID1").val($(this).data("captainid"));
       $("#CUSTOMERNAME1").val($(this).data("customername"));
       $("#CONTACTNUMBER1").val($(this).data("contactnumber"));
       $("#Status1").val($(this).data("status")); 

   });



});


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
            }) 

              $("#btncancel1").trigger("click");
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
                window.location.href = "Home.php";
            });
        }
        return data;
    }
});
    } })

}





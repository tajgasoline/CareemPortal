

function tblAllUsers(){

   $("#datatable").DataTable({
    "ajax": "api/TblSites.php",
    "columns": [
     { "data": "Empty"},
     { "data": "id"} ,
     { "data": "site"}  ,
     { "data": "city"} ,
     { "data": "username"},
     { "data": "password"}

     ],
});

}


$(document).ready(function()
{

 tblAllUsers(); 

 $(document).on("click", ".edit-modal", function(){




     $("#SitesID1").val($(this).attr("id"));
     $("#SitesName1").val($(this).data("site"));
     $("#City1").val($(this).data("city")); 
     $("#Username1").val($(this).data("username")); 
     $("#Password1").val($(this).data("password"));
     $("#userid1").val($(this).data("userid"));


 });



});


function AddSite(){

 var SitesName = $("#SitesName").val(); 
 var City = $("#City").val(); 
 var Username = $("#Username").val(); 
 var Password = $("#Password").val(); 




 Swal.fire({
  title: "Are you sure?",
  text: "You want to add New Site!",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes!"
}).then((result) => {
  if (result.value) {  
    $.ajax( {
        url: "api/AddSites.php",
        method: "POST",
        data: { 
            SitesName:SitesName,
            City:City,
            Username:Username,
            Password:Password
        },
        dataType: "JSON",
        success: function (data) 
        {
            var result = data.result;
            if ( result == "Inserted" )
            {
               Swal.fire({
                title: "Site Added Successfully!",
                type: "success",
                timer: 4000,
                showConfirmButton: true,
            }) 


               $("#btncancel").trigger("click");
               $("#datatable").DataTable().destroy(); 
               tblAllUsers();
           }  else   if ( result == "Username Already Exist" )
              { 
                  Swal.fire({
                    title: "Username Already Exist!",
                    type: "error",
                    timer: 4000,
                    showConfirmButton: true,
                })  

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




function UpdateSites() {

    var SitesID1 = $("#SitesID1").val(); 
    var SitesName = $("#SitesName1").val(); 
    var City = $("#City1").val(); 
    var Username = $("#Username1").val(); 
    var Password = $("#Password1").val(); 
    var userid1 = $("#userid1").val(); 

    

    Swal.fire({
      title: "Are you sure?",
      text: "You want to update this Site!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
  }).then((result) => {
      if (result.value) {  
        $.ajax( {
            url: "api/UpdateSites.php",
            method: "POST",
            data: {
                ID1:SitesID1,
                userid1:userid1,
                SitesName:SitesName,
                City:City,
                Username:Username,
                Password:Password
            },
            dataType: "JSON",
            success: function (data) 
            {
                var result = data.result; 
                if ( result == "Done" )
                { 
                  Swal.fire({
                    title: "Site Updated Successfully!",
                    type: "success",
                    timer: 4000,
                    showConfirmButton: true,
                }) 

                  $("#btncancel1").trigger("click");
                  $("#datatable").DataTable().destroy(); 
                  tblAllUsers();

              }    else   if ( result == "Username Already Exist" )
              { 
                  Swal.fire({
                    title: "Username Already Exist!",
                    type: "error",
                    timer: 4000,
                    showConfirmButton: true,
                })  

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





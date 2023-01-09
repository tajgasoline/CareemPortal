

function tblAllUsers(){
 
   $("#datatable").DataTable({
        "ajax": "api/TblAllUsers.php",
        "columns": [
         { "data": "Empty"},
           { "data": "staffusername"} ,{ "data": "staffpass"} ,{ "data": "Role"} 
          
        ],
      });

}


$(document).ready(function()
    {

 tblAllUsers(); 

$(document).on("click", ".edit-modal", function(){

       
         $("#id2").val($(this).attr("id"));$("#staffusername1").val($(this).data("staffusername"));$("#staffpass1").val($(this).data("staffpass"));$("#Role1").val($(this).data("role"));
     
      });



 });


function AddAllUsers(){
 
var staffusername = $("#staffusername").val(); 

 var staffpass = $("#staffpass").val(); 

 var Role = $("#Role").val(); 

 
    
  if(staffusername == "" ){

     $("#1v").css("display", "block");
      $("#1v").text("Invalid staffusername."); 
         $("#staffusername").css("border-color", "red");
         $("#staffusername").focus();
        

    } else if(staffpass == "" ){

     $("#2v").css("display", "block");
      $("#2v").text("Invalid staffpass."); 
         $("#staffpass").css("border-color", "red");
         $("#staffpass").focus();
        

    } else if(Role == "" ){

     $("#3v").css("display", "block");
      $("#3v").text("Invalid Role."); 
         $("#Role").css("border-color", "red");
         $("#Role").focus();
        

    }
    else 
    {   

 
         Swal.fire({
  title: "Are you sure?",
  text: "You want to add New AllUsers!",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes!"
}).then((result) => {
  if (result.value) {  
    $.ajax( {
            url: "api/AddAllUsers.php",
            method: "POST",
            data: {
 
                staffusername:staffusername,staffpass:staffpass,Role:Role
               
              
            },
            dataType: "JSON",
            success: function (data) 
            {
                var result = data.result;
                if ( result == "Inserted" )
                {
                       Swal.fire({
            title: "AllUsers Added Successfully!",
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
}




function UpdateAllUsers() {

  var id = $("#id2").val();
 

var staffusername1 = $("#staffusername1").val(); 

 var staffpass1 = $("#staffpass1").val(); 

 var Role1 = $("#Role1").val(); 

 
    
  if(staffusername1 == "" ){

     $("#1v1").css("display", "block");
      $("#1v1").text("Invalid staffusername."); 
         $("#staffusername1").css("border-color", "red");
         $("#staffusername1").focus();
        

    } else if(staffpass1 == "" ){

     $("#2v1").css("display", "block");
      $("#2v1").text("Invalid staffpass."); 
         $("#staffpass1").css("border-color", "red");
         $("#staffpass1").focus();
        

    } else if(Role1 == "" ){

     $("#3v1").css("display", "block");
      $("#3v1").text("Invalid Role."); 
         $("#Role1").css("border-color", "red");
         $("#Role1").focus();
        

    }
    else 
    { 
 
        Swal.fire({
  title: "Are you sure?",
  text: "You want to update this AllUsers!",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes!"
}).then((result) => {
  if (result.value) {  
        $.ajax( {
            url: "api/UpdateAllUsers.php",
            method: "POST",
            data: {id:id,
                 staffusername1:staffusername1,staffpass1:staffpass1,Role1:Role1
            },
            dataType: "JSON",
            success: function (data) 
            {
                var result = data.result; 
                if ( result == "Done" )
                { 
                      Swal.fire({
            title: "AllUsers Updated Successfully!",
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
}





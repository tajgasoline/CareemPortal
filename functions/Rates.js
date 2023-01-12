     jQuery('.numbersOnly').keyup(function () 
     { 
      this.value = this.value.replace(/[^0-9\.,]/g,'');
    });




     function BtnLoadingTrue(){            
      $("#btnlogin").attr("disabled", true);
      $('#btnlogin').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Please Wait...');
    }
    function BtnLoadingFalse(){            
      $("#btnlogin").attr("disabled", false);
      $('#btnlogin').html('Done <i class="fas fa-sign-in-alt ml-1"></i>');
    }

    $(document).ready(function()
    {
      getRates();
    });


    function getRates(){


      var check = '1';

      $.ajax({
        url: "api/getRates.php",

        method: "POST",
        data: {
          check : check
        },

        dataType: "JSON",

        success: function (data) 
        { 

          var PetrolPrice = data.PetrolPrice;
          var PetrolDiscount = data.PetrolDiscount;
          var DiesalPrice = data.DiesalPrice;
          var DiesalDiscount = data.DiesalDiscount;
          var result = data.result;

          if(result == 'Success'){
            $("#PetrolPreviousRates").val(PetrolPrice); 
            $("#DiesalPreviousRates").val(DiesalPrice); 
            $("#PetrolDiscount").val(PetrolDiscount); 
            $("#DiesalDiscount").val(DiesalDiscount); 

          } 

          return data;

        }
      });
    }



    function setRates(){

      var PetrolNewRates = $("#PetrolNewRates").val(); 
      var DiesalNewRates = $("#DiesalNewRates").val(); 
      var PetrolDiscount = $("#PetrolDiscount").val(); 
      var DiesalDiscount = $("#DiesalDiscount").val(); 

      $("#vv2").css("display", "none");
      $("#PetrolNewRates").css("border-color", "");
      $("#vv4").css("display", "none");
      $("#DiesalNewRates").css("border-color", "");

      if(PetrolNewRates == "" || PetrolNewRates == null){

       $("#vv2").css("display", "block");
       $("#vv2").text("Please Fill This.");
       $("#PetrolNewRates").css("border-color", "red");
       $("#PetrolNewRates").focus();

     }else if(DiesalNewRates == "" || DiesalNewRates == null){

       $("#vv4").css("display", "block");
       $("#vv4").text("Please Fill This.");
       $("#DiesalNewRates").css("border-color", "red");
       $("#DiesalNewRates").focus();
     } else {


      Swal.fire({
        title: "Are you sure?",
        text: "You want to Apply!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
      }).then((result) => {
        if (result.value) {  
          $.ajax({
            url: "api/setRates.php",

            method: "POST",
            data: {
              PetrolNewRates : PetrolNewRates,
              DiesalNewRates : DiesalNewRates,
              PetrolDiscount : PetrolDiscount,
              DiesalDiscount : DiesalDiscount
            },

            dataType: "JSON",

            success: function (data) 
            { 

              var result = data.result;
              if(result == 'Done'){
                Swal.fire({
                  title: "Rates Updated Successfully!",
                  type: "success",
                  timer: 4000,
                  showConfirmButton: true,
                }).then(function () {
                  location.reload();
                });  

              } else {

                Swal.fire({
                  title: "Opps! Some Error Occured!",
                  type: "error",
                  text: "Please Try Again",
                  timer: 4000,
                  showConfirmButton: true,
                }).then(function () {
                  location.reload();
                });
              }

              return data;

            }
          });

        } })
      


    }


  }
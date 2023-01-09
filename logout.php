<?php 
session_start();
if(session_destroy())
{
}
?>



<!DOCTYPE html>
<html>
    <head>
         <!-- Sweet Alert -->
        <link href="assets/plugins/sweet-alert2/sweetalert2.min.css" rel="stylesheet" type="text/css">
        <link href="assets/plugins/animate/animate.css" rel="stylesheet" type="text/css">

        <title></title>
     
<script src="assets/plugins/sweet-alert2/sweetalert2.min.js"></script>
  
  <script type="text/javascript">
  	function so() {

              
                Swal.fire({
                    title: "Thankyou For your Services!",
                    timer: 2500,

                }).then(function() {
                    window.location.href = 'Login.php';
                });
            

            

}
  </script>
    </head>


    <body onload="so();"  >
		
       

	</body>
</html>



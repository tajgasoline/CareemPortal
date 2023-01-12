<?php 
session_start();
$staffusername = $_SESSION['staffusername'];
$site = $_SESSION['site'];
$role = $_SESSION['role'];
?>  
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Taj Gasoline</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta content="Taj Gasoline Portal" name="description" />
  <meta content="Taj Gasoline" name="author" />
  <!-- App favicon -->
  <link rel="shortcut icon" href="../../favicon.ico">
  <link rel="stylesheet" href="assets/plugins/morris/morris.css">
  <link href="assets/plugins/sweet-alert2/sweetalert2.min.css" rel="stylesheet" type="text/css">
  <!-- App css -->
  <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
  <link href="assets/css/icons.css" rel="stylesheet" type="text/css" />
  <link href="assets/css/metisMenu.min.css" rel="stylesheet" type="text/css" />
  <link href="assets/css/style.css" rel="stylesheet" type="text/css" />
  <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"></script>
  <!-- Plugins css -->
  <link href="assets/plugins/daterangepicker/daterangepicker.css" rel="stylesheet" />
  <link href="assets/plugins/select2/select2.min.css" rel="stylesheet" type="text/css" />
  <link href="assets/plugins/bootstrap-colorpicker/css/bootstrap-colorpicker.css" rel="stylesheet" type="text/css" />
  <link href="assets/plugins/timepicker/bootstrap-material-datetimepicker.css" rel="stylesheet">
  <link href="assets/plugins/bootstrap-touchspin/css/jquery.bootstrap-touchspin.min.css" rel="stylesheet" />
</head>
<body>
  <!-- Top Bar Start -->
  <?php include "navbar.php"; ?>
  <div class="page-wrapper">
   <?php include "leftbar.php"; ?>
   <!-- Left Sidenav -->
   <!-- Page Content-->
   <div class="page-content">
    <div class="container-fluid">
      <!-- Page-Title -->
      <div class="row">
        <div class="col-sm-12">
          <div class="page-title-box">
            <div class="float-right">
              <ol class="breadcrumb">
               <li class="breadcrumb-item"><a href="javascript:void(0);">Careem Portal</a></li>
               <li class="breadcrumb-item active">Home</li>
             </ol>
           </div>
           <h4 class="page-title">Welcome <?php echo $staffusername .' - '.$site.' - '.$role;?></h4>
         </div><!--end page-title-box-->
       </div><!--end col-->
     </div>
     <div class="row">
      <div class="col-md-12"> 
        <div class="card">
          <div class="card-body">
            <label for="example-text-input" class="col-lg-12 col-form-label   cust-font-rem-Data-title text-center">Site Rates Page</label>
            <div class="row">
              <div class="col-md-10"> 
               <div class="form-group row">
                <div class="col-sm-3">
                 <label for="example-text-input" class="col-form-label  cust-font-rem">Products.</label>
               </div>
               <div class="col-sm-3">
                <label for="example-text-input" class="col-form-label  cust-font-rem">Old Rates.</label>
              </div>
              <div class="col-sm-3">
                <label for="example-text-input" class="col-form-label  cust-font-rem">New Rates.</label>
              </div>
              <div class="col-sm-3">
                <label for="example-text-input" class="col-form-label  cust-font-rem">Discount.</label>
              </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-3">
                  <label for="example-text-input" class="col-form-label  cust-font-rem">Petrol Rates.</label>
                </div>
              
              <div class="col-sm-3"> 
                <input class="form-control numbersOnly " type="text" disabled="" placeholder="Petrol Previous Rates" id="PetrolPreviousRates"><span class="help-block custom-block-hide" id="vv1"><small ></small></span>
              </div>
              <div class="col-sm-3"> 
                <input class="form-control numbersOnly " type="text"  placeholder="Petrol New Rates" id="PetrolNewRates"><span class="help-block custom-block-hide" id="vv2"><small ></small></span>
              </div>
              <div class="col-sm-3"> 
                <input class="form-control  numbersOnly" type="text"  placeholder="Petrol New Discount" id="PetrolDiscount"><span class="help-block custom-block-hide" id="vv5"><small ></small></span>
              </div>
            </div>
            <div class="form-group row">
                  <div class="col-sm-3">
                <label for="example-text-input" class="col-form-label  cust-font-rem">Diesal Rates.</label>
                </div>
             
              <div class="col-sm-3">
                <input class="form-control numbersOnly " type="text" disabled="" placeholder="Diesal Previous Rates" id="DiesalPreviousRates"><span class="help-block custom-block-hide" id="vv3"><small ></small></span>
              </div>
              <div class="col-sm-3">
                <input class="form-control  numbersOnly" type="text"  placeholder="Diesal New Rates" id="DiesalNewRates"><span class="help-block custom-block-hide" id="vv4"><small ></small></span>
              </div>
              <div class="col-sm-3">
                <input class="form-control numbersOnly " type="text"  placeholder="Diesal New Discount" id="DiesalDiscount"><span class="help-block custom-block-hide" id="vv6"><small ></small></span>
              </div>
            </div>
            <div class="form-group row"> 
              <div class="col-md-2"> </div>
              <div class="col-md-2"> </div>
              <div class="col-md-2"> </div>
              <div class="col-md-2"> </div>
              <div class="col-md-2"> </div>
              <div class="col-md-2"> 
                <button type="button" onclick="setRates();" class="btn btn-primary waves-effect waves-light" style="width: 100%;">Update</button>
              </div>    
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </div>
</div><!-- container -->
</div>
<!-- end page content -->
</div>
<!-- end page-wrapper -->
<!-- jQuery  -->
<script src="assets/js/jquery.min.js"></script>
<script src="assets/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/metisMenu.min.js"></script>
<script src="assets/js/waves.min.js"></script>
<script src="assets/js/jquery.slimscroll.min.js"></script>
<!--Plugins-->
<script src="assets/plugins/moment/moment.js"></script>
<!-- Required datatable js -->
<script src="assets/plugins/datatables/jquery.dataTables.min.js"></script>
<script src="assets/plugins/datatables/dataTables.bootstrap4.min.js"></script>
<script src="assets/plugins/datatables/dataTables.responsive.min.js"></script>
<script src="assets/plugins/datatables/responsive.bootstrap4.min.js"></script>
<script src="assets/plugins/sweet-alert2/sweetalert2.min.js"></script>
<script src="assets/pages/jquery.sweet-alert.init.js"></script>
<script src="functions/Rates.js"></script>
<!--         <script src="functions/Staff.js"></script> -->
<!-- App js -->
<script src="assets/js/app.js"></script>
<!-- Plugins js -->
<script src="assets/plugins/moment/moment.js"></script>
<script src="assets/plugins/daterangepicker/daterangepicker.js"></script>
<script src="assets/plugins/select2/select2.min.js"></script>
<script src="assets/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js"></script>
<script src="assets/plugins/timepicker/bootstrap-material-datetimepicker.js"></script>
<script src="assets/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js"></script>
<script src="assets/plugins/bootstrap-touchspin/js/jquery.bootstrap-touchspin.min.js"></script>
<script src="assets/pages/jquery.forms-advanced.js"></script>
</body>
</html>
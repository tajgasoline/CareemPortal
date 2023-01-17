  <?php
  session_start();
  ?>
  <!DOCTYPE html>
  <html lang="en">
  <head>
   <?php include('meta.php'); ?>
   <!--Morris Chart CSS -->
   <link rel="stylesheet" href="assets/plugins/morris/morris.css">
   <link href="assets/plugins/sweet-alert2/sweetalert2.min.css" rel="stylesheet" type="text/css">
   <!-- DataTables -->
   <link href="assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
   <link href="assets/plugins/datatables/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />
   <!-- Responsive datatable examples -->
   <link href="assets/plugins/datatables/responsive.bootstrap4.min.css" rel="stylesheet" type="text/css" /> 
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
                             <li class="breadcrumb-item"><a href="javascript:void(0);">Home</a></li>
                             <li class="breadcrumb-item active">Customers Management</li>
                         </ol>
                     </div>
                     <h4 class="page-title">Customers Management Page</h4>
                 </div><!--end page-title-box-->
             </div><!--end col-->
         </div>
         <!-- end page title end breadcrumb -->
         <div class="col-lg-12" >
            <div class="card">
                <div class="card-body">
                   

                            <div class="modal-body">
              <div class="col-lg-12">
                <div class="row">
                    <div class="col-lg-12">
                        <label for="example-text-input" class="col-lg-12 col-form-label  C-Modal-Data-title text-center">Edit Customer</label>
                                     <div class="form-group row">
                <label for="example-text-input" class="col-sm-2 col-form-label  cust-font-rem">Search</label>
                <div class="col-sm-8">
                <input class="form-control  " type="text"   placeholder="Search Here..." id="Search">         
                 </div>
                  <div class="col-sm-2">
                    <button type="button" class="btn btn-primary waves-effect waves-light" id="btnSearch" onclick="Searching();"> Search</button>
                  </div>
               </div>

                  


                        <div class="form-group row">
                            <label for="example-text-input" class="col-sm-2 col-form-label text-right">Id</label>
                            <div class="col-sm-10">
                                <input class="form-control" type="text" id="ID1" disabled="">
                                <span class="help-block custom-block-hide" id="0v1"><small ></small></span></div>
                            </div>
                  

                            <div class="form-group row">
                              <label for="example-text-input" class="col-sm-2 col-form-label text-right">VehicleID</label>
                              <div class="col-sm-10">
                                  <input class="form-control  " type="text" placeholder="VehicleID" id="VehicleID1"><span class="help-block custom-block-hide" id="1v"><small ></small></span>
                              </div>
                          </div>
                          <div class="form-group row">
                              <label for="example-text-input" class="col-sm-2 col-form-label text-right">VEHICLETYPE</label>
                              <div class="col-sm-10">
                                  <!-- <input class="form-control  " type="text" placeholder="VEHICLETYPE" id="VEHICLETYPE1"> -->
                                   <select class="form-control" id="VEHICLETYPE1">
                                    <option value="null" selected disabled>Select VEHICLE TYPE</option>
                                    <option value="Car">Car</option>
                                    <option value="Bike">Bike</option>
                                    <option value="Rickshaw">Rickshaw</option>
                                      <option value="Pickup">Pick up</option>
                                </select>
                                <span class="help-block custom-block-hide" id="1v"><small ></small></span>
                              </div>
                          </div>
                          <div class="form-group row">
                              <label for="example-text-input" class="col-sm-2 col-form-label text-right">VEHICLENUMBER</label>
                              <div class="col-sm-10">
                                  <input class="form-control  " type="text" placeholder="VEHICLENUMBER" id="VEHICLENUMBER1"><span class="help-block custom-block-hide" id="1v"><small ></small></span>
                              </div>
                          </div>

                          <div class="form-group row">
                              <label for="example-text-input" class="col-sm-2 col-form-label text-right">CaptainID</label>
                              <div class="col-sm-10">
                                  <input class="form-control  " type="text" placeholder="CaptainID" id="CaptainID1"><span class="help-block custom-block-hide" id="1v"><small ></small></span>
                              </div>
                          </div>
                          <div class="form-group row">
                              <label for="example-text-input" class="col-sm-2 col-form-label text-right">CUSTOMERNAME</label>
                              <div class="col-sm-10">
                                  <input class="form-control  " type="text" placeholder="CUSTOMERNAME" id="CUSTOMERNAME1"><span class="help-block custom-block-hide" id="1v"><small ></small></span>
                              </div>
                          </div>
                          <div class="form-group row">
                              <label for="example-text-input" class="col-sm-2 col-form-label text-right">CONTACTNUMBER</label>
                              <div class="col-sm-10">
                                  <input class="form-control  " type="text" placeholder="CONTACTNUMBER" id="CONTACTNUMBER1"><span class="help-block custom-block-hide" id="1v"><small ></small></span>
                              </div>
                          </div>


                          <div class="form-group row">
                              <label for="example-text-input" class="col-sm-2 col-form-label text-right">Status</label>
                              <div class="col-sm-10"> 
                                  <select class="form-control" id="Status1">
                                    <option value="null" selected disabled>Select Status</option>
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">In Active</option>
                                </select>
                                <span class="help-block custom-block-hide" id="3v"><small ></small></span>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-md-4"> 
                      <button type="button" onclick="UpdateAllUsers();" class="btn btn-primary waves-effect waves-light" style="width: 100%;">Update</button>
                  </div>

                  <div class="col-md-4"> 
                     <button type="button" class="btn btn-light waves-effect waves-light" data-dismiss="modal" id="btncancel1" aria-hidden="true" style="width: 100%;">Cancel</button>
                 </div>
             </div>
         </div>
     </div> 

 
                </div>
            </div>
        </div> <!-- end col -->

  




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


<script src="functions/UpdateCustomer.js"></script>

<!-- App js -->
<script src="assets/js/app.js"></script>
</body>
</html>
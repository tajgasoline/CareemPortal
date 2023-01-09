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

     <div class="col-lg-12" >
      <div class="card">
        <div class="card-body">
         <h3>FBR Calculation Page</h3>
         <div class="text-left">
          <div class="card">
            <table>
              <tr>
                <td>
                  <div class="form-group row">
                    <label for="example-text-input" class="col-sm-2 col-form-label text-right">Store</label>
                    <div class="col-sm-10">
                     <select class="select2 form-control  custom-select select2-hidden-accessible" style="width: 100%; height:36px;" tabindex="-1" aria-hidden="true"   id="storeid">
                      <option>Select Store</option>
                      <optgroup>
                        <?php 

                        include("MainConnect.php");
                        $query = "select store from tblfbrtransactions";
                        $stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
                        while ($row = sqlsrv_fetch_array($stmt))
                        {
                         echo '<option value="'.$row["store"].'">'.$row["store"].'</option>';
                       }

                       ?>
                     </optgroup>
                   </select>
                   <span class="help-block custom-block-hide" id="9v1"><small ></small></span>
                 </div>
               </div> 
             </td>
             <td>
               <div class="form-group row">
                <label for="example-text-input" class="col-sm-2 col-form-label text-right">Transaction ID</label>
                <div class="col-sm-10">
                 <select class="select2 form-control  custom-select select2-hidden-accessible" style="width: 100%; height:36px;" tabindex="-1" aria-hidden="true"   id="field1">
                  <option>Select Store</option> 

                  <optgroup>
                    <?php 
                    include("StoreConnect.php");
                    $query = "select distinct top 10  RTST.TRANSACTIONID
                    from  RETAILTRANSACTIONSALESTRANS RTST 
                    inner join RETAILTRANSACTIONTABLE RTT on RTT.TRANSACTIONID= RTST.TRANSACTIONID 
                    where RTST.transactionstatus in (0,2) ";
                    $stmt = sqlsrv_query($StoreConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
                    while ($row = sqlsrv_fetch_array($stmt))
                    {
                     echo '<option value="'.$row["TRANSACTIONID"].'">'.$row["TRANSACTIONID"].'</option>';
                   }

                   ?>
                 </optgroup>
               </select>
               <span class="help-block custom-block-hide" id="9v1"><small ></small></span>
             </div>
           </div>  
         </td>
         <td>
           <div class="form-group row">
             <button class="btn btn-primary btn-round btn-block waves-effect waves-light" onclick="Search();" id="btnlogin" type="button">Search<i class="fas fa-sign-in-alt ml-1"></i></button>
           </div>

         </td>
       </tr>
     </table> 

   </div>
     <div class="card">
            <table>
              <tr>
                <td> FBR ID</td>
                <td> <input type="text" id="fbrid"></td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button class="btn btn-primary btn-round btn-block waves-effect waves-light" onclick="Fbrtrans();" id="btnlogin" type="button" style="width:5rem;">Submit </button>
                </td>
              </tr>
            </table>
          </div>

     <div class="card">
       <table> 
        <tr>
          <td>Customer Name</td><td><span id='custname'>-</span></td>
        </tr>
        <tr>
          <td>Table No.</td><td> 10</td>
        </tr>
        <tr>
          <td>Person</td><td>5</td>
        </tr>
        <tr>
          <td>Transection ID</td><td ><span id='transid'>-</span></td>
        </tr>
      </table>
     </div>


   <table id="datatable" class="table table-bordered dt-responsive nowrap" style=" overflow-x: auto;border-collapse: collapse; border-spacing: 0; width: 100%;">
    <thead>
      <tr> 
        <th>Item ID</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Net Amount</th> 
      </tr>
    </thead>
    <tbody id="tbody">
    </tbody>
  </table>
</div>
</div>
</div> <!-- end col -->
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
<!-- Buttons examples -->
<script src="assets/plugins/datatables/dataTables.buttons.min.js"></script>
<script src="assets/plugins/datatables/buttons.bootstrap4.min.js"></script>

<!-- Responsive examples -->
<script src="assets/plugins/datatables/dataTables.responsive.min.js"></script>
<script src="assets/plugins/datatables/responsive.bootstrap4.min.js"></script>
<script src="assets/pages/jquery.datatable.init.js"></script>
<script src="assets/plugins/sweet-alert2/sweetalert2.min.js"></script>
<script src="assets/pages/jquery.sweet-alert.init.js"></script>
<script src="functions/FBRTransactions2.js"></script>

<!-- Plugins js -->
<script src="assets/plugins/moment/moment.js"></script>
<script src="assets/plugins/daterangepicker/daterangepicker.js"></script>
<script src="assets/plugins/select2/select2.min.js"></script>
<script src="assets/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js"></script>
<script src="assets/plugins/timepicker/bootstrap-material-datetimepicker.js"></script>
<script src="assets/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js"></script>
<script src="assets/plugins/bootstrap-touchspin/js/jquery.bootstrap-touchspin.min.js"></script>
<script src="assets/pages/jquery.forms-advanced.js"></script>
<!-- App js -->
<script src="assets/js/app.js"></script>
</body>
</html>
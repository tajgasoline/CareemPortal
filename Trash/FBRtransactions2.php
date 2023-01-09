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
         <center><h1>Bill Summary</h1></center>
         <div class="text-left">
          <div class="row">
           <div class="col-md-4">

             <div class="card"  style="padding:2rem; height: 12rem; border: 1px solid rgb(126 20 20 / 50%);">
              <center><h6>Searching</h6></center> 
              <table>
                <tr>
                  <td>Store</td>
                  <td>   <select class="select2 form-control  custom-select select2-hidden-accessible" style="width: 100%; height:36px;" tabindex="-1" aria-hidden="true"   id="storeid">
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
                 </select></td>
               </tr>
               <tr>
                <td>Transaction</td>
                <td>
                 <select class="select2 form-control  custom-select select2-hidden-accessible" style="width: 100%; height:36px;" tabindex="-1" aria-hidden="true"   id="field1">
                  <option>Select Transaction</option>
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
             </td>
           </tr>
           <tr>
            <td></td>
            <td>      <button class="btn btn-primary  btn-block waves-effect waves-light" style="width:50%;" onclick="Search();" id="btnlogin" type="button">Search<i class="fas fa-sign-in-alt ml-1"></i></button></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="col-md-4">
     <div class="card"  style="padding:2rem; height: 12rem; border: 1px solid rgb(126 20 20 / 50%);">
      <center><h6>Customer Information</h6></center> 
      <table> 
        <tr>
          <td><h5 class="margin-zero">Customer Name</h5> </td><td><h5 class="margin-zero"><span id='custname'>-</span></h5> </td>
        </tr>
        <tr>
          <td><h5 class="margin-zero">Table No. </h5> </td><td><h5 class="margin-zero"><span id='tablenumber'>10</span></h5> </td> 
        </tr>
        <tr>
          <td><h5 class="margin-zero">Person</h5> </td><td><h5 class="margin-zero"><span id='persons'>10</span></h5> </td>  
        </tr>
        <tr>
         <td><h5 class="margin-zero">Transection ID</h5> </td><td><h5 class="margin-zero"><span id='transid'>-</span></h5> </td> 
       </tr>
     </table>
   </div>
 </div>
 <div class="col-md-4">
   <div class="card"  style="padding:2rem; height: 12rem; border: 1px solid rgb(126 20 20 / 50%);">
    <center><h6>Bill Information</h6></center> 
    <table> 
      <tr>
        <td><h5 class="margin-zero">Amount</h5> </td><td><h5 class="margin-zero">Rs.<span id='totalamount'>80535</span></h5> </td>
      </tr>
      <tr>
        <td><h5 class="margin-zero">Sales Tax %</h5> </td><td><h5 class="margin-zero"><span>13 %</span></h5> </td> 
      </tr>
      <tr>
        <td><h5 class="margin-zero">Sales Tax Amount</h5> </td><td><h5 class="margin-zero">Rs.<span id='taxamount'>1046.5</span></h5> </td>  
      </tr>
      <tr>
       <td><h5 class="margin-zero">Total Bill</h5> </td><td><h5 class="margin-zero">Rs.<span id='totalbill'>9100</span></h5> </td> 
     </tr>
   </table>
 </div>
</div>
</div>
<div class="row">
  <div class="col-md-12">
        <div class="card" style="padding:2rem;  border: 1px solid rgb(126 20 20 / 50%);">
            <table>
              <tr>
                <td> FBR Vertification </td>
                <td> <input type="text" id="fbrid"></td>
                <td>
                   <button class="btn btn-primary  btn-block waves-effect waves-light" style="width:50%;" onclick="Fbrtrans();" id="btnlogin" type="button" style="width:0.5rem;">Submit<i class="fas fa-sign-in-alt ml-1"></i></button></td>
               
                </td>
              </tr> 
            </table>
          </div>
    
  </div>
  
</div>
<table id="datatable" class="table table-bordered dt-responsive nowrap" style=" overflow-x: auto;border-collapse: collapse; border-spacing: 0; width: 100%;">
  <thead>
    <tr> 
      <th>Item ID</th>
      <th>Qty</th>
      <th>Price</th>
      <th>Net Amount</th> 
    </tr>
  </thead>
  <tbody id="tbody">
  </tbody>
</table>
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
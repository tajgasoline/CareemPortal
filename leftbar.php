<?php 
if (!isset($_SESSION['role'])) {
 header('location: Login.php');
}else {

 $role = $_SESSION['role']; 
}
?> 

<div class="left-sidenav">
  <ul class="metismenu left-sidenav-menu">
    <?php
    if($role == 'Users' || $role == 'Order Taker' ){
        echo '<li id="FBRtransactions"><a href="Home.php"><i class="ti-bar-chart"></i><span>Home Page</span></i></span></a></li>'; 
    }

     if($role == 'Manager' || $role == 'Cashier'){
      echo '<li id="FBRtransactions2" ><a href="FBRtransactions2.php"><i class="ti-bar-chart"></i><span>FBR trans Page</span></i></span></a></li> ';
     }

     if($role == 'Manager' || $role == 'Cashier'){
      echo '<li id="FBRtransactions2" ><a href="MainReport.php"><i class="ti-bar-chart"></i><span>Report</span></i></span></a></li>';    }
   
    if($role == 'Manager'){
      echo '<li id="FBRtransactions2" ><a href="AllUser.php"><i class="ti-bar-chart"></i><span>Users</span></i></span></a></li>';    }
    ?>
   
  
  </ul>
</div>
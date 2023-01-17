<?php 
if (!isset($_SESSION['role'])) {
 header('location: Login.php');
}else {

 $role = $_SESSION['role']; 
}
?> 

<div class="left-sidenav">
  <ul class="metismenu left-sidenav-menu">
    <!-- <li id="FBRtransactions"><a style="padding:0.8rem 0rem !important;" href="Home.php"><i class="ti-bar-chart"></i><span>User</span></i></span></a></li> -->
    <?php
    if($role == 'User'  ){
        echo '<li id="FBRtransactions"><a style="padding:0.8rem 0rem !important;" href="Home.php"><i class="ti-bar-chart"></i><span>Home</span></i></span></a></li>'; 
    }

     if($role == 'Manager'  ){
        echo '<li id="FBRtransactions"><a style="padding:0.8rem 0rem !important;" href="Home.php"><i class="ti-bar-chart"></i><span> Home</span></i></span></a></li>

        <li id="FBRtransactions2" ><a style="padding:0.8rem 0rem !important;" href="AllUser.php"><i class="ti-bar-chart"></i><span>User Management</span></i></span></a></li>

     
         <li id="FBRtransactions2" ><a style="padding:0.8rem 0rem !important;" href="Rates.php"><i class="ti-bar-chart"></i><span>Rates Management</span></i></span></a></li>

        '; 
    }

        if($role == 'SuperAdmin'  ){
        echo ' <li class="nav-item">
                                    <a class="nav-link"  style="padding:0.8rem 0.1rem !important;" href="#"><i class="ti-bar-chart"></i><span>Customers Management</span><span class="menu-arrow"><i class="mdi mdi-chevron-right"></i></span></a>
                                
                                    <ul class="nav-second-level mm-collapse" aria-expanded="false">
                                        <li><a href="AddCustomer.php">Add Customer</a></li>
                                        <li><a href="UpdateCustomer.php">Update Customer</a></li>            
                                    </ul>                             
                                </li> '; 
    }


       if($role == 'SuperAdmin'  ){
        echo '<li id="FBRtransactions"><a style="padding:0.8rem 0rem !important;" href="Home.php"><i class="ti-bar-chart"></i><span> Home</span></i></span></a></li>

        <li id="FBRtransactions2" ><a style="padding:0.8rem 0rem !important;" href="AllUser.php"><i class="ti-bar-chart"></i><span>User Management</span></i></span></a></li>


         <li class="nav-item">
                                    <a class="nav-link"  style="padding:0.8rem 0.1rem !important;" href="#"><i class="ti-bar-chart"></i><span>Customers Management</span><span class="menu-arrow"><i class="mdi mdi-chevron-right"></i></span></a>
                                
                                    <ul class="nav-second-level mm-collapse" aria-expanded="false">
                                        <li><a href="AddCustomer.php">Add Customer</a></li>
                                        <li><a href="UpdateCustomer.php">Update Customer</a></li>            
                                    </ul>            
                                
                                </li>


             <li id="FBRtransactions2" ><a style="padding:0.8rem 0rem !important;" href="Sites.php"><i class="ti-bar-chart"></i><span>Sites Management</span></i></span></a></li>

        '; 
    }

 
    ?>
   
 
  
  </ul>
</div>
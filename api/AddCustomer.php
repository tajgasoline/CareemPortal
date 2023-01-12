
<?php
if(  isset($_POST["VehicleID1"]) && isset($_POST["VEHICLETYPE1"]) 
 && isset($_POST["VEHICLENUMBER1"]) && isset($_POST["CaptainID1"]) && 
 isset($_POST["CUSTOMERNAME1"]) &&
isset($_POST["CONTACTNUMBER1"]) && isset($_POST["Status1"])  )
{   
 
$VehicleID1 = htmlentities($_POST["VehicleID1"]); 
$VEHICLETYPE1 = htmlentities($_POST["VEHICLETYPE1"]); 
$VEHICLENUMBER1 = htmlentities($_POST["VEHICLENUMBER1"]); 
$CaptainID1 = htmlentities($_POST["CaptainID1"]); 
$CUSTOMERNAME1 = htmlentities($_POST["CUSTOMERNAME1"]); 
$CONTACTNUMBER1 = htmlentities($_POST["CONTACTNUMBER1"]); 
$Status1 = htmlentities($_POST["Status1"]); 



session_start();
$staffusername = $_SESSION['staffusername'];
$site = $_SESSION['site'];
$role = $_SESSION['role'];
   
  $result="";
  include('../MainConnect.php'); 
  if(!$MainConnect){
    $result = "Server Connection Error";
    
  }
  else{

 

 include('../MainConnect.php');  
  $query = "select count(id) as id from careemportalcustomers";
  $stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
  while ($row = sqlsrv_fetch_array($stmt))
  {
    $id = $row["id"]; 

  } 
  $id = $id +1; 
      // for New insertion
            $query = "insert into CareemPortalCustomers(id,VEHICLETYPE,VEHICLENUMBER,CUSTOMERNAME,CONTACTNUMBER,STATUS,CREATEDBY,CREATIONDATE,CaptainID,VehicleID) values (?,?,?,?,?,?,?,getdate(),?,?) ";

            $params = array(&$id,&$VEHICLETYPE1,&$VEHICLENUMBER1,&$CUSTOMERNAME1,&$CONTACTNUMBER1,&$Status1,&$staffusername,&$CaptainID1,&$VehicleID1);
            $stmt = sqlsrv_prepare($MainConnect, $query, $params);
 
    if (sqlsrv_execute( $stmt ) === false ) 
    {
      $result="Not Inserted";
    }
    else{
      $result="Inserted";
    }
  
  }
  
   


  $data ["result"] = $result;
    echo json_encode($data);

}
?>
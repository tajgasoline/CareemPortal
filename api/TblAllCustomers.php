<?php
  include('../MainConnect.php'); 
// Prepare array

session_start();
$staffusername = $_SESSION['staffusername'];
$site = $_SESSION['site'];
$role = $_SESSION['role'];

$mysql_data = array();
$result="";
$message="";
if($MainConnect)
{

    $query =  "select id,VEHICLETYPE,VEHICLENUMBER,CUSTOMERNAME,CONTACTNUMBER,STATUS,CREATIONDATE,CaptainID,VehicleID from CareemPortalCustomers";
     $stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());

    if (!$stmt
  )  {


      $result  = "error";
      $message = "query error";
    }
    else
    {
      $result  = "success";
      $message = "query success";
      $empty="";
    while ($row = sqlsrv_fetch_array($stmt))
      {
      $Action="<td><a  
      id='".$row["id"]."' 
      data-id='".$row["id"]."' 
      data-vehicletype='".$row["VEHICLETYPE"]."' 
      data-vehiclenumber='".$row["VEHICLENUMBER"]."' 
      data-customername='".$row["CUSTOMERNAME"]."' 
      data-contactnumber='".$row["CONTACTNUMBER"]."' 
      data-status='".$row["STATUS"]."' 
      data-creationdate='".date_format($row["CREATIONDATE"],"Y/m/d H:i:s")."' 
      data-captainid='".$row["CaptainID"]."' 
      data-vehicleid='".$row["VehicleID"]."'  
      class='mr-2 edit-modal' data-toggle='modal' data-animation='bounce' data-target='.edit-modal1' ><i class='fas fa-edit text-info font-16'></i> </a>";
        $mysql_data[] = array
        (
          "Empty"     => $Action,
          "id" => $row["id"],
          "VEHICLETYPE" => $row["VEHICLETYPE"],
          "VEHICLENUMBER" => $row["VEHICLENUMBER"],
          "VehicleID" => $row["VehicleID"],
          "CUSTOMERNAME" => $row["CUSTOMERNAME"],
          "CaptainID" => $row["CaptainID"],
          "CONTACTNUMBER" => $row["CONTACTNUMBER"],
          "CREATIONDATE" => $row["CREATIONDATE"],
          "STATUS" => $row["STATUS"]
          
        );
      }
    }
  // Close database connection
  // mysqli_close($connect);
}
// Prepare data
$data = array(
  "result"  => $result,
  "message" => $message,
  "data"    => $mysql_data
);
// Convert PHP array to JSON array
$json_data = json_encode($data);
print $json_data;
?>
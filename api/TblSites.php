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
  $query =  " select cpu.id as UserID,cps.id as SiteID,cpu.username,cpu.password,cpu.role,cps.site,cps.city
  from CareemPortalUsers cpu,CareemPortalSite cps
  where cps.site=cpu.site and cpu.role ='Manager'";
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
      id='".$row["SiteID"]."' 
      data-id='".$row["UserID"]."' 
      data-userid='".$row["UserID"]."' 
      data-username='".$row["username"]."' 
      data-password='".$row["password"]."' 
      data-role='".$row["role"]."' 
      data-site='".$row["site"]."' 
      data-city='".$row["city"]."'  
      class='mr-2 edit-modal' data-toggle='modal' data-animation='bounce' data-target='.edit-modal1' ><i class='fas fa-edit text-info font-16'></i> </a>";
      $mysql_data[] = array
      (
        "Empty"     => $Action,
        "id" => $row["SiteID"],
        "username" => $row["username"],
        "password" => $row["password"],
        "role" => $row["role"],
        "site" => $row["site"],
        "city" => $row["city"]
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
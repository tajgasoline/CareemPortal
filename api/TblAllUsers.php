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

    $query =  "select id,username as staffusername,password as staffpass,site,Role from CareemPortalUsers where
     site = '".$site."' ";
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
      $Action="<td><a  id='".$row["id"]."' data-staffusername='".$row["staffusername"]."' data-staffpass='".$row["staffpass"]."' data-role='".$row["Role"]."'  class='mr-2 edit-modal' data-toggle='modal' data-animation='bounce' data-target='.edit-modal1' ><i class='fas fa-edit text-info font-16'></i> </a>";
        $mysql_data[] = array
        (
          "Empty"     => $Action,
          "staffusername" => $row["staffusername"],"staffpass" => $row["staffpass"],
          "Role" => $row["Role"],"site" => $row["site"]
          
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

<?php
if(isset($_POST["staffusername"]) && isset($_POST["staffpass"]) && isset($_POST["Role"]) )
{   

 
$staffusername = htmlentities($_POST["staffusername"]); 
$staffpass = htmlentities($_POST["staffpass"]); 
$Role = htmlentities($_POST["Role"]); 


session_start();
$username = $_SESSION['staffusername'];
$site = $_SESSION['site'];
$role = $_SESSION['role'];
   
  $result="";
  include('../MainConnect.php'); 
  if(!$MainConnect){
    $result = "Server Connection Error";
    
  }
  else{

 

 include('../MainConnect.php');  
  $query = "select count(id) as id from careemportal";
  $stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
  while ($row = sqlsrv_fetch_array($stmt))
  {
    $id = $row["id"]; 

  } 
  $id = $id +1; 
      // for New insertion
            $query = "insert into CareemPortalUsers(id,username,password,site,role) values (?,?,?,?,?) ";

            $params = array(&$id,&$staffusername,&$staffpass,&$site,&$role);
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
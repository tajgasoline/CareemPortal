<?php
if(  isset($_POST["SitesName"]) && isset($_POST["City"]) 
 && isset($_POST["Username"]) && isset($_POST["Password"])   )
{   
  $SitesName = htmlentities($_POST["SitesName"]); 
  $City = htmlentities($_POST["City"]); 
  $Username = htmlentities($_POST["Username"]); 
  $Password = htmlentities($_POST["Password"]);  
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
    $query = "select username  from CareemPortalUsers where username = '".$Username."'";
    $stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
    while ($row = sqlsrv_fetch_array($stmt))
    {
      $username = $row["username"]; 
    } 
    if( $username == '' || $username == null){
     include('../MainConnect.php');  
     $query = "select count(id) as id from careemportalsite";
     $stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
     while ($row = sqlsrv_fetch_array($stmt))
     {
      $id = $row["id"]; 
    } 
    $id = $id +1; 
      // for New insertion
    $query = "insert into CareemPortalsite(id,site,city,doc) values (?,?,?,getdate()) ";
    $params = array(&$id,&$SitesName,&$City);
    $stmt = sqlsrv_prepare($MainConnect, $query, $params);
    if (sqlsrv_execute( $stmt ) === false ) 
    {
      $result="Not Inserted";
    }
    else{
      $result="Inserted";
      $query = "select count(id) as id from CareemPortalUsers";
      $stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
      while ($row = sqlsrv_fetch_array($stmt))
      {
        $id = $row["id"]; 
      } 
      $id = $id +1; 
      $query = "insert into CareemPortalUsers(id,username,password,site,role) values (?,?,?,?,'Manager') ";
      $params = array(&$id,&$Username,&$Password,&$SitesName);
      $stmt = sqlsrv_prepare($MainConnect, $query, $params);
      if (sqlsrv_execute( $stmt ) === false ) 
      {
        $result="Not Inserted";
      }
      else{
        $result="Inserted";}
      }
    }
    else
    {
      $result= "Username Already Exist";
      // echo json_encode($data);
    }
  }
  $data ["result"] = $result;
  echo json_encode($data);
}
?>
<?php


if(isset($_POST['username']) &&  isset($_POST['pass']) )
{
	

	$username = $_POST["username"]; 
	$Password = $_POST["pass"]; 
	$dbemail = '';
	$dbPassword = '';
	$role = '';
	$dbusername = '';
	$result = '';
$staffusername = '';
// $Password = '';
$site = '';
$role = '';
$staffpasss = '';
 
	$result = array(); 

	include('../MainConnect.php');  
	$query = "select username,password,site,role 
from CareemPortalUsers where username='".$username."'";
	$stmt = sqlsrv_query($MainConnect, $query, array(), array("Scrollable" => 'static')) or die(sqlsrv_errors());
	while ($row = sqlsrv_fetch_array($stmt))
	{
		$staffusername = $row["username"];
		$staffpasss = $row["password"];
		$site = $row["site"]; 
		$role = $row["role"]; 

	} 
 
	if($staffusername == NULL)
	{

		$result = "norecord";
 

	}	

	else if(strtoupper($username) == strtoupper($staffusername) &&  $Password == $staffpasss )
	{	


		session_start();
		$_SESSION['staffusername'] = $staffusername;
		$_SESSION['site'] = $site; 
		$_SESSION['role'] = $role;  
		
  
		$result = "successful";
 
	} 

 
	$data["username"] = $staffusername;
	$data["role"] = $role;
	$data["result"] = $result;
	echo json_encode($data);



}

?>
